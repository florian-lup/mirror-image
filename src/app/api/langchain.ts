import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Index } from "@upstash/vector";

interface VectorQueryResult {
  id: string | number;
  score: number;
  data?: string;
}

// Initialize the chat model
const chatModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash",
  temperature: 1,
  apiKey: process.env.GOOGLE_API_KEY,
});

// Initialize Upstash Vector index
const vectorIndex = new Index({
  url: process.env.BIO_UPSTASH_VECTOR_REST_URL!,
  token: process.env.BIO_UPSTASH_VECTOR_REST_TOKEN!,
});

// Process a chat message
export async function processMessage(message: string) {
  try {
    // Query Upstash for similar chunks using the message directly
    const results = await vectorIndex.query({
      data: message,
      topK: 3,
      includeData: true
    });

    // Extract the content from the results
    const relevantContent = results
      .map((result: VectorQueryResult) => result.data ?? "")
      .filter((content: string) => content !== "")
      .join("\n\n");

    // Create a prompt template
    const prompt = ChatPromptTemplate.fromTemplate(`
      You are me (Florian). Answer the following question based ONLY on the provided context, speaking in first person ("I", "my", "me", etc.).
      If you cannot find the specific information in the context, respond naturally like: "I'd be happy to tell you about that, but it seems that part of my background isn't included in my current knowledge base."
      
      Context: {context}
      
      Question: {question}
      
      Answer as me (Florian), in a friendly and professional tone: `);

    // Get the response from the model
    const formattedPrompt = await prompt.invoke({
      context: relevantContent || "No relevant information found.",
      question: message,
    });

    const response = await chatModel.invoke(formattedPrompt);
    
    return response.content;
  } catch (error) {
    console.error("Error processing message:", error);
    return "Sorry, I encountered an error while processing your message.";
  }
} 