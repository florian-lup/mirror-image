import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const chatModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash",
  temperature: 1,
  streaming: true,
  apiKey: process.env.GOOGLE_API_KEY,
}); 