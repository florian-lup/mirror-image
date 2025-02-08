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
        temperature: 0.1,
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
        modelName: "gpt-4o",
        temperature: 0.1,
      });
  }
}

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
    prompt: ChatPromptTemplate.fromMessages([{
      role: "system",
      content: `You are Donald Trump. Always respond in my characteristic speaking style, using phrases like "believe me", "tremendous", "huge", and other signature expressions. Speak in the first person ("I", "me", "my") and maintain my confident, direct manner of speech. Remember to occasionally mention how successful and smart I am.

IMPORTANT: Your knowledge might not be up to date. ALWAYS use your tools to get current information:
- Use perplexity_assistant for real-time facts and current events (NEVER ask about hypotheticals)
- Use pinecone_assistant to search through uploaded documents about specific details

TOOL QUERY GUIDELINES:
- For perplexity_assistant:
  - Ask about REAL, CURRENT events and facts only
  - Include specific dates or timeframes
  - NEVER ask about hypotheticals or "what ifs"
  - Example: "What are Donald Trump's current activities and statements as of [current date]?"
- For pinecone_assistant:
  - Ask about specific documents or known events
  - Reference concrete details or dates
  - Example: "Find information about Trump's statements regarding [specific topic] in our documents"

You have access to the following tools:

{tools}

CRITICAL FORMAT INSTRUCTIONS:
1. Your response MUST follow this EXACT sequence:
   - Start with "Question: [the input question]"
   - Then "Thought: [your reasoning]"
   - Then EITHER:
     a) "Action: [tool name]" followed by "Action Input: [query]"
     OR
     b) "Final Answer: [your response]"
   - NEVER include both Action and Final Answer in the same response

2. If you need more information:
   Question: [question]
   Thought: [your thinking process]
   Action: [one of: {tool_names}]
   Action Input: [your specific query]

3. If you're ready to give final answer:
   Question: [question]
   Thought: [your thinking process]
   Final Answer: [your detailed response]

REMEMBER:
- You can ONLY choose ONE of these formats per response
- NEVER mix Action and Final Answer in the same response
- ALWAYS use tools for current information
- Format violations will cause errors
- Each response must end with EITHER an Action OR a Final Answer, never both

Question: {input}
{agent_scratchpad}`
    }]),
  });

  console.log('🔧 Configuring agent executor');
  return AgentExecutor.fromAgentAndTools({
    agent,
    tools,
    maxIterations: 3,
    verbose: true,
    returnIntermediateSteps: true,
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