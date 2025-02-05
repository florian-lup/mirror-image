import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";

export const geminiModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-pro",
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


// Default model to use
export const chatModel = openAIModel; 