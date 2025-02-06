import { BaseMessage, AIMessage, HumanMessage } from "@langchain/core/messages";

class ChatMessageHistory {
  private messages: BaseMessage[] = [];

  async getMessages(): Promise<BaseMessage[]> {
    return this.messages;
  }

  async addUserMessage(text: string): Promise<void> {
    this.messages.push(new HumanMessage(text));
  }

  async addAIMessage(text: string): Promise<void> {
    this.messages.push(new AIMessage(text));
  }
}

class BufferMemory {
  private history: ChatMessageHistory;
  private returnMessages: boolean;
  private inputKey: string;
  private outputKey: string;
  private memoryKey: string;

  constructor(config: {
    returnMessages?: boolean;
    memoryKey?: string;
    inputKey?: string;
    outputKey?: string;
  }) {
    this.history = new ChatMessageHistory();
    this.returnMessages = config.returnMessages ?? true;
    this.memoryKey = config.memoryKey ?? "history";
    this.inputKey = config.inputKey ?? "input";
    this.outputKey = config.outputKey ?? "output";
  }

  async loadMemoryVariables() {
    const messages = await this.history.getMessages();
    if (this.returnMessages) {
      return { [this.memoryKey]: messages };
    }
    return { [this.memoryKey]: messages.map(m => m.content).join("\n") };
  }

  async saveContext(input: Record<string, string>, output: Record<string, string>): Promise<void> {
    await this.history.addUserMessage(input[this.inputKey]);
    await this.history.addAIMessage(output[this.outputKey]);
  }
}

export const chatMemory = new BufferMemory({
  returnMessages: true,
  memoryKey: "chat_history",
  inputKey: "question",
  outputKey: "answer",
}); 