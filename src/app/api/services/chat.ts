import { chatModel } from "../config/model";
import { bioVectorIndex } from "../vector-stores/bio-vector-store";
import { bioChatPrompt } from "../prompts/bio-chat-prompt";
import { chatMemory } from "../config/memory";
import type { VectorSearchResult } from "../types/chat";
import { AIMessage } from "@langchain/core/messages";

// Minimum similarity score (0 to 1) - higher means more relevant
const MIN_SIMILARITY_SCORE = 0.7;

export async function generateChatResponse(message: string) {
  try {
    console.log("\n=== Starting Chat Response Generation ===");
    console.log(`User Message: "${message}"`);

    // Query Upstash for similar chunks using the message directly
    console.log("\n1. Querying Vector Database...");
    const results = await bioVectorIndex.query({
      data: message,
      topK: 3, // Increased to get more candidates
      includeData: true
    });

    // Extract the content from the results with similarity score filtering
    const relevantContent = results
      .filter((result: VectorSearchResult) => {
        const isRelevant = result.score >= MIN_SIMILARITY_SCORE;
        console.log(`- Score for chunk: ${result.score.toFixed(3)}${isRelevant ? ' ✓' : ' ✗'}`);
        return isRelevant;
      })
      .map((result: VectorSearchResult) => result.data ?? "")
      .filter((content: string) => content !== "")
      .join("\n\n");

    console.log("Vector Search Results:");
    console.log("- Number of chunks found:", results.length);
    console.log("- Number of relevant chunks:", results.filter(r => r.score >= MIN_SIMILARITY_SCORE).length);
    console.log("- Relevant content:", relevantContent ? "Found" : "None");
    if (relevantContent) {
      console.log("- Content preview:", relevantContent.substring(0, 150) + "...");
    }

    // Get the chat history
    console.log("\n2. Loading Chat Memory...");
    const history = await chatMemory.loadMemoryVariables();
    const hasHistory = history.chat_history && history.chat_history.length > 0;
    console.log("Chat History Status:", hasHistory ? "Available" : "Empty");
    if (hasHistory) {
      console.log("- Number of previous messages:", history.chat_history.length);
      console.log("- Last few messages:", 
        JSON.stringify(history.chat_history.slice(-2), null, 2)
      );
    }

    // Get the response from the model
    console.log("\n3. Generating Response...");
    console.log("Combining:", [
      hasHistory ? "✓ Chat History" : "✗ No Chat History",
      relevantContent ? "✓ Vector Search Results" : "✗ No Vector Results"
    ].join(", "));

    const formattedPrompt = await bioChatPrompt.invoke({
      context: relevantContent || "No relevant information found.",
      question: message,
      chat_history: history.chat_history || "",
    });

    // Get the full response text first
    const aiMessage = await chatModel.invoke(formattedPrompt);
    
    // Handle different model response formats
    let responseText: string;
    if (aiMessage instanceof AIMessage) {
      responseText = typeof aiMessage.content === 'string' 
        ? aiMessage.content 
        : JSON.stringify(aiMessage.content);
    } else {
      // Handle Gemini model response
      responseText = typeof aiMessage === 'string' 
        ? aiMessage 
        : aiMessage.text || JSON.stringify(aiMessage);
    }
    
    console.log("\nAI Response:", responseText);

    // Save the interaction to memory before creating the stream
    console.log("\n4. Saving to Memory...");
    await chatMemory.saveContext(
      { question: message },
      { answer: responseText }
    );
    console.log("- Saved user message and AI response to memory");
    console.log("\n=== Chat Response Generation Complete ===\n");

    // Create a stream from the response for the client
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(responseText));
        controller.close();
      },
    });

    return stream;
  } catch (error) {
    console.error("\n❌ Error in chat response generation:", error);
    throw error;
  }
} 