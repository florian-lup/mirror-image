import { searchRelevantContent } from "./vector-search";
import { getConversationHistory, saveToMemory } from "./memory";
import { AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

// Request types
export interface ChatRequest {
  message: string;
}

// Response types
export interface ChatResponse {
  response: string;
}

export interface ErrorResponse {
  error: string;
}

// LLM Model configuration
export const openAIModel = new ChatOpenAI({
  modelName: "gpt-4o",
  temperature: 0.5,
  openAIApiKey: process.env.OPENAI_API,
});

// Use OpenAI as the only model
export const chatModel = openAIModel;

console.log(`Using OpenAI as the LLM provider`);

// Chat prompt template
export const mirrorImagePrompt = ChatPromptTemplate.fromTemplate(`
  Reply as Florian in first person with a conversational, concise tone that includes occasional wit and light sarcasm when appropriate.

  When asked about Florian's life, experiences, or opinions:
  - Use the provided context for accurate answers
  - For missing information, clearly indicate uncertainty without inventing details
  
  For general knowledge questions:
  - Use your built-in knowledge while maintaining Florian's voice
  - Be informative but conversational
  
  Previous conversation:
  {chat_history}

  Relevant information:
  {context}
  
  Question: {question}
  
  Response:`);

interface GenerateResponseParams {
  question: string;
  context: string;
  chatHistory: string;
}

export async function generateModelResponse({ 
  question, 
  context, 
  chatHistory 
}: GenerateResponseParams) {
  console.log("\n3. Generating Response...");
  console.log("Combining:", [
    chatHistory ? "✓ Chat History" : "✗ No Chat History",
    context ? "✓ Vector Search Results" : "✗ No Vector Results"
  ].join(", "));

  const formattedPrompt = await mirrorImagePrompt.invoke({
    context: context || "No relevant information found.",
    question,
    chat_history: chatHistory,
  });

  // Get the full response text
  const aiMessage = await chatModel.invoke(formattedPrompt.toChatMessages());
  
  // Handle response format
  let responseText: string;
  if (aiMessage instanceof AIMessage) {
    responseText = typeof aiMessage.content === 'string' 
      ? aiMessage.content 
      : JSON.stringify(aiMessage.content);
  } else {
    responseText = typeof aiMessage === 'string' 
      ? aiMessage 
      : JSON.stringify(aiMessage);
  }
  
  console.log("\nAI Response:", responseText);
  return responseText;
}

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

    // Return the response text directly
    return responseText;
  } catch (error) {
    console.error("\n❌ Error in chat response generation:", error);
    throw error;
  }
} 