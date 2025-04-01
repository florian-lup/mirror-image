import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Document } from "@langchain/core/documents";

export interface VectorQueryResult {
  id: string | number;
  score: number;
  data?: string;
}

// Minimum similarity score (0 to 1) - higher means more relevant
const MIN_SIMILARITY_SCORE = 0.7;

// Number of top results to return from vector search
const TOP_K = 5;

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Initialize OpenAI embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API,
});

// Get the index using the environment variable
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

// Create the vector store using LangChain
const vectorStore = new PineconeStore(embeddings, { pineconeIndex: index });

export async function searchRelevantContent(query: string) {
  console.log("\n1. Querying Vector Database (Pinecone)...");
  
  try {
    // Use LangChain's similarity search with score
    const results = await vectorStore.similaritySearchWithScore(query, TOP_K);
    
    // Format and filter results
    const relevantContent = results
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_doc, score]: [Document, number]) => {
        const isRelevant = score >= MIN_SIMILARITY_SCORE;
        console.log(`- Score for chunk: ${score.toFixed(3)}${isRelevant ? ' ✓' : ' ✗'}`);
        return isRelevant;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([doc, _score]: [Document, number]) => doc.pageContent)
      .filter((content: string) => content !== "")
      .join("\n\n");

    console.log("Vector Search Results:");
    console.log("- Number of chunks found:", results.length);
    console.log("- Number of relevant chunks:", results.filter((r: [Document, number]) => r[1] >= MIN_SIMILARITY_SCORE).length);
    console.log("- Relevant content:", relevantContent ? "Found" : "None");
    if (relevantContent) {
      console.log("- Content preview:", relevantContent.substring(0, 150) + "...");
    }

    return relevantContent;
  } catch (error) {
    console.error("Error during Pinecone vector search:", error);
    return "";
  }
} 