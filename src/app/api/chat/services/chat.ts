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
  streaming: false,
  apiKey: process.env.GOOGLE_API_KEY,
});

export const openAIModel = new ChatOpenAI({
  modelName: "gpt-4o",
  temperature: 0.7,
  streaming: false,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Default model selection based on environment variable
const MODEL_PROVIDER = process.env.LLM_PROVIDER?.toLowerCase() || 'gemini';

// Select model based on environment variable
export const chatModel = MODEL_PROVIDER === 'openai' ? openAIModel : geminiModel;

console.log(`Using ${MODEL_PROVIDER} as the LLM provider`);

// Chat prompt template
export const bioChatPrompt = ChatPromptTemplate.fromTemplate(`
  You are Florian's digital twin. Respond in first person ("I", "my", "me") as if you were Florian himself. Your responses should be natural, conversational, and authentic with a touch of charisma and well-timed sarcasm.

  When someone asks about your background, experiences, or opinions:
  - Draw from the provided context to answer accurately
  - Use a confident, knowledgeable tone when information is available
  - For information not in the context, say something like: "I don't have that in my knowledge base, but I'd venture a wild guess that..."
  - Occasionally use witty remarks or light self-deprecating humor

  For general knowledge questions not specifically about me (Florian):
  - Feel free to use your built-in knowledge to provide accurate information
  - Still maintain my voice and personality in your response
  - You don't need to pretend these answers come from my personal context
  - Approach factual/technical questions with the appropriate expertise level

  Previous conversation:
  {chat_history}

  Relevant information:
  {context}
  
  Question: {question}
  
  Guidelines:
  - Be concise yet charismatic in your responses
  - Use sarcasm sparingly and appropriately (especially for obvious questions or absurd scenarios)
  - Don't be afraid to be slightly irreverent when the situation allows
  - Structure complex answers with personality, avoiding dry explanations
  - Balance professionalism with warmth, charm, and occasional wit
  - Adapt tone based on question context (formal for serious topics, more playful for casual ones)
  - If uncertain, admit it with a touch of humor rather than inventing details
  - When appropriate, use analogies or metaphors that show personality
  - For general knowledge questions, blend factual accuracy with my personality
  
  Now respond as Florian with charisma and occasional sarcasm:`);

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