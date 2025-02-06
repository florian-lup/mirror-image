import { searchRelevantContent } from "./vector-search";
import { getConversationHistory, saveToMemory } from "./memory";
import { generateModelResponse, createResponseStream } from "./response";

export async function generateChatResponse(message: string) {
  try {
    console.log("\n=== Starting Chat Response Generation ===");
    console.log(`User Message: "${message}"`);

    // Get relevant content from vector search
    const relevantContent = await searchRelevantContent(message);

    // Get chat history
    const { history } = await getConversationHistory();

    // Generate response
    const responseText = await generateModelResponse({
      question: message,
      context: relevantContent,
      chatHistory: history,
    });

    // Save to memory
    await saveToMemory(message, responseText);

    console.log("\n=== Chat Response Generation Complete ===\n");

    // Create and return stream
    return createResponseStream(responseText);
  } catch (error) {
    console.error("\n❌ Error in chat response generation:", error);
    throw error;
  }
} 