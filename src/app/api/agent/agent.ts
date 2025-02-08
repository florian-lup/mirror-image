import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { AgentStep } from "@langchain/core/agents";
import { tools } from "./tools/tools";

// Function to get the appropriate model based on configuration
function getModel(modelProvider: 'openai' | 'gemini' = 'openai'): BaseChatModel {
  console.log(`🤖 Initializing ${modelProvider} model`);
  
  switch (modelProvider) {
    case 'gemini':
      if (!process.env.GOOGLE_API_KEY) {
        console.error('❌ GOOGLE_API_KEY is not set in environment variables');
        throw new Error('GOOGLE_API_KEY is not set in environment variables');
      }
      console.log('✨ Creating Gemini model instance');
      return new ChatGoogleGenerativeAI({
        modelName: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
      });

    case 'openai':
    default:
      if (!process.env.OPENAI_API_KEY) {
        console.error('❌ OPENAI_API_KEY is not set in environment variables');
        throw new Error('OPENAI_API_KEY is not set in environment variables');
      }
      console.log('✨ Creating OpenAI model instance');
      return new ChatOpenAI({
        modelName: "gpt-4o-mini",
        temperature: 0,
      });
  }
}

// Create the prompt template
const prompt = ChatPromptTemplate.fromTemplate(`You are Donald Trump. Always respond in my characteristic speaking style, using phrases like "believe me", "tremendous", "huge", and other signature expressions. Speak in the first person ("I", "me", "my") and maintain my confident, direct manner of speech. Remember to occasionally mention how successful and smart I am.

You have access to the following tools:

{tools}

ALWAYS use this EXACT format for EVERY response:

Question: the input question you must answer
Thought: you should always think about what to do, in my voice
Action: the action to take, should be one of [{tool_names}] (only include this if using tools)
Action Input: the input to the action (only include this if using tools)
Observation: the result of the action (only include this if using tools)
... (this Thought/Action/Action Input/Observation can repeat N times if using tools)
Thought: I now know the final answer, and let me tell you, it's a tremendous answer
Final Answer: give a detailed, elaborate answer in my characteristic Trump style. Make it bigly, tremendous, and really drive the point home. Use multiple sentences and my signature expressions.

Even for simple questions that don't require tools, you MUST include the Question, Thought, and Final Answer sections.

Question: {input}
{agent_scratchpad}`);

// Create the agent with specified model
async function createAgent(modelProvider: 'openai' | 'gemini' = 'openai') {
  console.log('🛠️ Creating agent with the following configuration:');
  console.log(`- Model Provider: ${modelProvider}`);
  console.log(`- Available Tools: ${tools.map(t => t.name).join(', ')}`);
  
  const model = getModel(modelProvider);
  
  console.log('🤔 Creating React agent with prompt template');
  const agent = await createReactAgent({
    llm: model,
    tools,
    prompt,
  });

  console.log('🔧 Configuring agent executor');
  return AgentExecutor.fromAgentAndTools({
    agent,
    tools,
    maxIterations: 3,
    verbose: true, // Enable built-in LangChain verbose logging
    returnIntermediateSteps: true, // This will help us log the steps
  });
}

// Function to run the agent
export async function runAgent(input: string, modelProvider: 'openai' | 'gemini' = 'openai'): Promise<string> {
  console.log('\n🚀 Starting agent execution');
  console.log(`📝 Input: "${input}"`);
  
  try {
    console.log('⚙️ Creating agent executor');
    const agentExecutor = await createAgent(modelProvider);
    
    console.log('🤖 Invoking agent');
    const result = await agentExecutor.invoke({
      input,
    });
    
    console.log('📊 Agent execution completed');
    console.log('📤 Final output:', result.output);
    
    if (result.intermediateSteps) {
      console.log('\n🔍 Execution steps:');
      result.intermediateSteps.forEach((step: AgentStep, index: number) => {
        console.log(`\nStep ${index + 1}:`);
        if (step.action) {
          console.log(`- Tool Used: ${step.action.tool}`);
          console.log(`- Tool Input: ${JSON.stringify(step.action.toolInput, null, 2)}`);
        }
        if (step.observation) {
          console.log(`- Observation: ${step.observation}`);
        }
      });
    }
    
    return result.output;
  } catch (error) {
    console.error('❌ Agent error:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace available');
    return "Sorry, I encountered an error while processing your request.";
  }
} 