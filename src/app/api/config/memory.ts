import { ConversationSummaryMemory } from "langchain/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { chatModel } from "./model";

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

export const chatMemory = new ConversationSummaryMemory({
  llm: chatModel,
  returnMessages: true,
  memoryKey: "chat_history",
  inputKey: "question",
  outputKey: "answer",
  prompt: summaryPrompt
});