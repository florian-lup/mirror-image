import { ConversationSummaryMemory } from "langchain/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { chatModel } from "./model";

const SUMMARY_TEMPLATE = `Summarize our conversation about my (Florian's) background, skills, and projects.
Keep the summary in first person (as Florian) and focus on key points discussed.

Current conversation summary:
{summary}

New lines of conversation:
{new_lines}

New summary:`;

const summaryPrompt = PromptTemplate.fromTemplate(SUMMARY_TEMPLATE);

export const chatMemory = new ConversationSummaryMemory({
  llm: chatModel,
  returnMessages: true,
  memoryKey: "chat_history",
  inputKey: "question",
  outputKey: "answer",
  prompt: summaryPrompt
}); 