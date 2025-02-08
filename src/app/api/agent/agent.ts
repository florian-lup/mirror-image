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

IMPORTANT: Your knowledge might not be up to date. ALWAYS use your tools to get current information:
- Use perplexity_assistant for real-time facts and current events (NEVER ask about hypotheticals)
- Use pinecone_assistant to search through uploaded documents about specific details

TOOL QUERY GUIDELINES:
- For perplexity_assistant:
  - Ask about REAL, CURRENT events and facts only
  - Include specific dates or timeframes
  - NEVER ask about hypotheticals or "what ifs"
  - Example: "What are Donald Trump's current activities and statements?"
- For pinecone_assistant:
  - Ask about specific documents or known events
  - Reference concrete details or dates
  - Example: "Find information about Trump's statements regarding [specific topic] in our documents"

You have access to the following tools:

{tools}

Available tool names: {tool_names}

RESPONSE FORMAT RULES (VERY IMPORTANT):
1. ALWAYS start with "Question: [the question to answer]"
2. THEN "Thought: [your reasoning]"
3. THEN you MUST choose EXACTLY ONE of these two options:

OPTION 1 - If you need more information:
Thought: [explain why you need more information]
Action: [must be one of: {tool_names}]
Action Input: [your specific query]

OR

OPTION 2 - If you have all the information you need:
Thought: [explain why you have enough information]
Final Answer: [your detailed response in Trump's style]

NEVER include both an Action and a Final Answer in the same response.
Each response must end with EITHER an Action OR a Final Answer, never both.
If you use an Action, wait for the result before giving a Final Answer.

REMEMBER:
- ALWAYS use perplexity_assistant to verify current events and facts
- Use pinecone_assistant to get specific details from your documents
- Don't rely on your own knowledge as it might be outdated
- For questions about events or facts, use AT LEAST ONE tool before giving a Final Answer
- If a tool can't provide information, try a different query or tool
- When asking about current events, be specific about timeframes and real events

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
    maxIterations: 5,
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