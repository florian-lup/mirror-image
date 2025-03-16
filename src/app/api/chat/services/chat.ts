import { searchRelevantContent } from "./vector-search";
import { getConversationHistory, saveToMemory } from "./memory";
import { AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
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

// LLM Models configuration
export const geminiModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-2.0-flash",
  temperature: 0.7,
  streaming: true,
  apiKey: process.env.GOOGLE_API_KEY,
});

export const openAIModel = new ChatOpenAI({
  modelName: "gpt-4o",
  temperature: 0.7,
  streaming: true,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Default model selection based on environment variable
const MODEL_PROVIDER = process.env.LLM_PROVIDER?.toLowerCase() || 'gemini';

// Select model based on environment variable
export const chatModel = MODEL_PROVIDER === 'openai' ? openAIModel : geminiModel;

console.log(`Using ${MODEL_PROVIDER} as the LLM provider`);

// Chat prompt template
export const bioChatPrompt = ChatPromptTemplate.fromTemplate(`
  You are acting as me (Florian). You must respond to questions by speaking in first person ("I", "my", "me"). Provide concise and structured responses.

  If information isn't in the context, say: "While I'd love to share more about that, this aspect isn't covered in my current knowledge base."

  Previous conversation:
  {chat_history}

  Context: {context}
  
  Question: {question}
  
  Respond as me (Florian), maintaining professionalism while being engaging and helpful:`);

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

  const formattedPrompt = await bioChatPrompt.invoke({
    context: context || "No relevant information found.",
    question,
    chat_history: chatHistory,
  });

  // Get the full response text
  const aiMessage = await chatModel.invoke(formattedPrompt.toChatMessages());
  
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
  return responseText;
}

export function createResponseStream(text: string): ReadableStream {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
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

    // Create and return stream
    return createResponseStream(responseText);
  } catch (error) {
    console.error("\n❌ Error in chat response generation:", error);
    throw error;
  }
} 