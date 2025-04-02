import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export interface VectorQueryResult {
  id: string | number;
  score: number;
  text: string;
}

// Search configuration
const MIN_SIMILARITY_SCORE = 0.4;
const TOP_K = 5;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Get the index using the environment variable
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

/**
 * Generate embeddings for a single text using OpenAI
 */
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });
  
  return response.data[0].embedding;
}

export async function searchRelevantContent(query: string) {
  console.log("\n1. Querying Vector Database (Pinecone)...");
  
  try {
    // Generate embedding for the query
    console.log(`- Generating embedding for query: "${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"`);
    const queryEmbedding = await generateEmbedding(query);
    
    // Query Pinecone with the embedding
    console.log(`- Querying Pinecone index with top_k=${TOP_K}`);
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: TOP_K,
      includeMetadata: true
    });
    
    // Log raw response for debugging
    console.log("- Raw Pinecone response matches:", queryResponse.matches.length);
    
    // Format and filter results
    const results = queryResponse.matches.map(match => ({
      id: match.id,
      score: match.score || 0,
      text: match.metadata?.text as string || ""
    }));
    
    // Filter by minimum similarity score
    let relevantResults = results.filter(result => {
      const isRelevant = result.score >= MIN_SIMILARITY_SCORE;
      console.log(`- Score for chunk ${result.id}: ${result.score.toFixed(3)}${isRelevant ? ' ✓' : ' ✗'}`);
      return isRelevant;
    });
    
    // Fallback: If no chunks pass the threshold but we have results, include the top result
    if (relevantResults.length === 0 && results.length > 0) {
      const topResult = results.reduce((prev, current) => 
        prev.score > current.score ? prev : current
      );
      console.log(`- No chunks passed threshold, falling back to top result (score: ${topResult.score.toFixed(3)})`);
      relevantResults = [topResult];
    }
    
    // Combine relevant content
    const relevantContent = relevantResults
      .map(result => result.text)
      .filter(text => text !== "")
      .join("\n\n");
    
    // Log results
    console.log("Vector Search Results:");
    console.log("- Number of chunks found:", results.length);
    console.log("- Number of relevant chunks:", relevantResults.length);
    console.log("- Relevant content:", relevantContent ? "Found" : "None");
    if (relevantContent) {
      console.log("- Content preview:", relevantContent.substring(0, 150) + "...");
    } else if (results.length > 0) {
      console.log("- Warning: Found chunks but none passed the similarity threshold");
      console.log("- Highest score:", Math.max(...results.map(r => r.score)).toFixed(3));
    }

    return relevantContent;
  } catch (error) {
    console.error("Error during Pinecone vector search:", error);
    return "";
  }
} 