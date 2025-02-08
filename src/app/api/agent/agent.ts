import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { tools } from "./tools";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});

// Create the prompt template
const prompt = ChatPromptTemplate.fromTemplate(`Answer the following questions as best you can. You have access to the following tools:

{tools}

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Question: {input}
{agent_scratchpad}`);

// Create the agent
const agent = await createReactAgent({
  llm: model,
  tools,
  prompt,
});

// Create the executor
const agentExecutor = AgentExecutor.fromAgentAndTools({
  agent,
  tools,
  maxIterations: 3,
});

// Function to run the agent
export async function runAgent(input: string): Promise<string> {
  try {
    const result = await agentExecutor.invoke({
      input,
    });
    return result.output;
  } catch (error) {
    console.error('Agent error:', error);
    return "Sorry, I encountered an error while processing your request.";
  }
} 