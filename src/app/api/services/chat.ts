import { chatModel } from "../config/model";
import { bioVectorIndex } from "../vector-stores/bio-vector-store";
import { bioChatPrompt } from "../prompts/bio-chat-prompt";
import type { VectorSearchResult } from "../types/chat";

export async function generateChatResponse(message: string): Promise<string> {
  try {
    // Query Upstash for similar chunks using the message directly
    const results = await bioVectorIndex.query({
      data: message,
      topK: 3,
      includeData: true
    });

    // Extract the content from the results
    const relevantContent = results
      .map((result: VectorSearchResult) => result.data ?? "")
      .filter((content: string) => content !== "")
      .join("\n\n");

    // Get the response from the model
    const formattedPrompt = await bioChatPrompt.invoke({
      context: relevantContent || "No relevant information found.",
      question: message,
    });

    const response = await chatModel.invoke(formattedPrompt);
    
    return response.content.toString();
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw error; // Let the route handler manage the error response
  }
} 