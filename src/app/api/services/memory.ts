import { chatMemory } from "../config/memory";
import { BaseMessage } from "@langchain/core/messages";

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