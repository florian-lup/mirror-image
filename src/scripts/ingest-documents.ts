import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const DOCUMENTS_PATH = path.join(process.cwd(), "documents");

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
      chunkSize: 1500,
      chunkOverlap: 300,
    });
    
    const documents = await textSplitter.splitDocuments(rawDocuments);
    console.log(`🔪 Split into ${documents.length} chunks`);
    
    // Initialize OpenAI embeddings
    console.log("🧠 Initializing OpenAI embeddings");
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API,
    });
    
    // Get or create the Pinecone index
    const indexName = process.env.PINECONE_INDEX_NAME!;
    console.log(`🌲 Using Pinecone index: ${indexName}`);
    
    const index = pinecone.Index(indexName);
    
    // Store documents in Pinecone with their embeddings
    console.log("💾 Storing documents in Pinecone...");
    await PineconeStore.fromDocuments(documents, embeddings, {
      pineconeIndex: index,
    });
    
    console.log("✅ Document ingestion complete!");
  } catch (error) {
    console.error("❌ Error during document ingestion:", error);
  }
}

// Execute the main function
main().catch(console.error); 