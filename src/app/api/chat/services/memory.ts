import { BaseMessage } from "@langchain/core/messages";
import { ConversationSummaryMemory } from "langchain/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";


// Memory types
export interface ChatMemoryVariables {
  chat_history?: Array<{
    type: 'constructor';
    id: string[];
    kwargs: {
      content: string;
      additional_kwargs: Record<string, unknown>;
      response_metadata: Record<string, unknown>;
    };
  }>;
}

export interface ChatContext {
  question: string;
  answer: string;
}

const SUMMARY_TEMPLATE = `You are summarizing our conversation.

Key points to follow:
1. Be concise and focus on the main topics discussed
2. Only include information that was actually discussed
3. Maintain context for follow-up questions

Current summary:
{summary}

New conversation:
{new_lines}

Updated summary (be concise):`;

const summaryPrompt = PromptTemplate.fromTemplate(SUMMARY_TEMPLATE);

// Model selection based on environment variable
const MODEL_PROVIDER = process.env.LLM_PROVIDER?.toLowerCase() || 'gemini';

// Create models for memory summarization
const geminiMemoryModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-2.0-flash",
  temperature: 0.3, // Lower temperature for more consistent summaries
  apiKey: process.env.GOOGLE_API_KEY,
});

const openAIMemoryModel = new ChatOpenAI({
  modelName: "gpt-4o-mini", // Using a smaller model for summarization to save costs
  temperature: 0.3,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Select memory model based on environment variable
const memorySummaryModel = MODEL_PROVIDER === 'openai' ? openAIMemoryModel : geminiMemoryModel;

console.log(`Using ${MODEL_PROVIDER} for memory summarization`);

export const chatMemory = new ConversationSummaryMemory({
  llm: memorySummaryModel,
  returnMessages: true,
  memoryKey: "chat_history",
  inputKey: "question",
  outputKey: "answer",
  prompt: summaryPrompt
});

type MessageLike = string | BaseMessage | {
  content?: string;
  kwargs?: {
    content: string;
  };
};

export async function getConversationHistory() {
  console.log("\n2. Loading Chat Memory...");
  const vars = await chatMemory.loadMemoryVariables({});
  const messages = vars.chat_history || [];
  const hasHistory = Array.isArray(messages) && messages.length > 0;
  
  console.log("Chat History Status:", hasHistory ? "Available" : "Empty");
  if (hasHistory) {
    console.log("- Number of previous messages:", messages.length);
    console.log("- Last few messages:", 
      JSON.stringify(messages.slice(-2), null, 2)
    );
  }

  // Convert messages to a simple string format
  const history = messages.map((msg: MessageLike) => {
    if (typeof msg === 'string') return msg;
    if ('content' in msg && msg.content) return String(msg.content);
    if ('kwargs' in msg && msg.kwargs?.content) return String(msg.kwargs.content);
    return JSON.stringify(msg);
  }).join("\n");

  return {
    history,
    hasHistory
  };
}

export async function saveToMemory(question: string, answer: string) {
  console.log("\n4. Saving to Memory...");
  await chatMemory.saveContext(
    { question },
    { answer }
  );
  console.log("- Saved user message and AI response to memory");
} 