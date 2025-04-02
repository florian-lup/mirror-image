import { Pinecone, Index as PineconeIndex } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { createHash } from "crypto";
import OpenAI from "openai";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Configuration
const DOCUMENTS_PATH = path.join(process.cwd(), "documents");
const BATCH_SIZE = 100; // Process in batches to avoid rate limits

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

/**
 * Generate a consistent document ID from source path + chunk index
 * This ensures the same document chunk always gets the same ID
 * even if content changes
 */
function generateDocumentId(docPath: string, chunkIndex: number): string {
  // Normalize the path to ensure consistency across platforms
  const normalizedPath = docPath.replace(/\\/g, '/');
  // Create a stable ID that doesn't change when content changes
  const stableId = `${normalizedPath}#chunk${chunkIndex}`;
  // Hash it for a fixed-length ID that's safe for Pinecone
  return createHash('sha256').update(stableId).digest('hex').substring(0, 36);
}

/**
 * Generate embeddings for an array of texts using OpenAI
 */
async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  console.log(`🧠 Generating ${texts.length} embeddings with OpenAI...`);
  
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
    encoding_format: "float",
  });
  
  // Extract embeddings from response
  return response.data.map(item => item.embedding);
}

/**
 * Process documents in batches and upsert to Pinecone
 */
async function processBatch(documents: Document[], pineconeIndex: PineconeIndex) {
  // Group documents by source
  const documentsBySource = new Map<string, Document[]>();
  
  documents.forEach(doc => {
    const source = doc.metadata.source || "unknown";
    if (!documentsBySource.has(source)) {
      documentsBySource.set(source, []);
    }
    documentsBySource.get(source)!.push(doc);
  });
  
  let batchIndex = 1;
  let processedDocuments = 0;
  
  // Process each source file
  for (const [source, docs] of documentsBySource.entries()) {
    console.log(`\n📄 Processing source: ${source}`);
    
    // Process in smaller batches to avoid API limits
    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
      const batchDocuments = docs.slice(i, i + BATCH_SIZE);
      console.log(`⚙️ Processing batch ${batchIndex}/${Math.ceil(documents.length/BATCH_SIZE)} (${batchDocuments.length} chunks)...`);
      
      // Extract text content
      const texts = batchDocuments.map(doc => doc.pageContent);
      
      // Generate embeddings
      const embeddings = await generateEmbeddings(texts);
      
      // Prepare vectors with consistent IDs based on source path + chunk index
      const vectors = batchDocuments.map((doc, idx) => ({
        id: generateDocumentId(doc.metadata.source || "unknown", idx + i),
        values: embeddings[idx],
        metadata: { 
          text: doc.pageContent, 
          source: doc.metadata.source || "unknown",
          chunkIndex: idx + i
        }
      }));
      
      // Upsert vectors to Pinecone
      console.log(`📤 Upserting ${vectors.length} vectors to Pinecone...`);
      await pineconeIndex.upsert(vectors);
      
      processedDocuments += batchDocuments.length;
      console.log(`✅ Batch ${batchIndex} complete (${processedDocuments}/${documents.length} total)`);
      batchIndex++;
    }
  }
}

async function main() {
  try {
    console.log("🔄 Starting document ingestion process...");
    
    // Initialize Pinecone client
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    
    // Load documents from directory
    console.log(`📁 Loading documents from ${DOCUMENTS_PATH}`);
    const loader = new DirectoryLoader(
      DOCUMENTS_PATH,
      {
        ".txt": (path) => new TextLoader(path),
      },
      true // recursive loading
    );
    
    const rawDocuments = await loader.load();
    console.log(`📄 Loaded ${rawDocuments.length} documents`);
    
    // Split documents into smaller chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 800,
      chunkOverlap: 200,
    });
    
    const documents = await textSplitter.splitDocuments(rawDocuments);
    console.log(`🔪 Split into ${documents.length} chunks`);
    
    // Get Pinecone index
    const indexName = process.env.PINECONE_INDEX_NAME!;
    console.log(`🌲 Using Pinecone index: ${indexName}`);
    const index = pinecone.Index(indexName);
    
    // Process and upsert documents in batches
    await processBatch(documents, index);
    
    console.log("\n✅ Document ingestion complete!");
    console.log(`🔍 Total chunks processed: ${documents.length}`);
    console.log(`💾 Documents are now searchable in your application`);
    console.log(`ℹ️ Note: Existing documents with the same source paths were updated rather than duplicated`);
    
  } catch (error) {
    console.error("❌ Error during document ingestion:", error);
  }
}

// Execute the main function
main().catch(console.error); 