import { Index } from "@upstash/vector";

export interface VectorQueryResult {
  id: string | number;
  score: number;
  data?: string;
}

// Additional search result type
export interface VectorSearchResult {
  id: string | number;
  score: number;
  data?: string;
}

export const vectorIndex = new Index({
  url: process.env.MIRROR_IMAGE_UPSTASH_VECTOR_REST_URL!,
  token: process.env.MIRROR_IMAGE_UPSTASH_VECTOR_REST_TOKEN!,
});

// Minimum similarity score (0 to 1) - higher means more relevant
const MIN_SIMILARITY_SCORE = 0.7;

export async function searchRelevantContent(query: string) {
  console.log("\n1. Querying Vector Database...");
  const results = await vectorIndex.query({
    data: query,
    topK: 10,
    includeData: true
  });

  // Extract the content from the results with similarity score filtering
  const relevantContent = results
    .filter((result: VectorQueryResult) => {
      const isRelevant = result.score >= MIN_SIMILARITY_SCORE;
      console.log(`- Score for chunk: ${result.score.toFixed(3)}${isRelevant ? ' ✓' : ' ✗'}`);
      return isRelevant;
    })
    .map((result: VectorQueryResult) => result.data ?? "")
    .filter((content: string) => content !== "")
    .join("\n\n");

  console.log("Vector Search Results:");
  console.log("- Number of chunks found:", results.length);
  console.log("- Number of relevant chunks:", results.filter(r => r.score >= MIN_SIMILARITY_SCORE).length);
  console.log("- Relevant content:", relevantContent ? "Found" : "None");
  if (relevantContent) {
    console.log("- Content preview:", relevantContent.substring(0, 150) + "...");
  }

  return relevantContent;
} 