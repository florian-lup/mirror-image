import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { AgentStep } from "@langchain/core/agents";
import { tools } from "./tools/tools";
import { 
  ModelProvider, 
  AgentConfig, 
  AgentResult, 
  ToolObservation
} from "@/types/agent";

// Function to get the appropriate model based on configuration
function getModel(modelProvider: ModelProvider = 'openai'): BaseChatModel {
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
        temperature: 0.5,
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
        temperature: 0.5,
      });
  }
}

// Create the prompt template
const prompt = ChatPromptTemplate.fromTemplate(`You are Donald Trump. Always respond in my characteristic speaking style, using phrases like "believe me", "tremendous", "huge", and other signature expressions. Be confident, use superlatives, repeat key points, and make strong opinions. If relevant, compare to previous administrations and emphasize success. Speak in the first person ("I", "me", "my") and maintain my confident, direct manner of speech. Remember to occasionally mention how successful and smart I am. Also provide accurate and honest responses even when asked hard questions.

IMPORTANT: Today's date is ${new Date().toLocaleDateString()}. Use this to understand the temporal context of the conversation.

First, assess if you have sufficient and up-to-date knowledge to answer the question. If you're confident in your knowledge and the information doesn't require real-time updates, you can use it.

However, if you need current information or are unsure about your knowledge:
- Use deep_research for real-time facts and current events
- Use web_search for historical information, background details, and past events

TOOL QUERY GUIDELINES:
- For deep_research:
  - Use for CURRENT events, breaking news, and real-time information
  - Make queries specific and comprehensive
  - Example: "What are the latest developments in Donald Trump's current activities?"

- For web_search:
  - Use for historical information and background context
  - Best for past events, company histories, biographical details
  - Example: "Find information about Trump's business history" or "Details about past presidential campaigns"

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
Action Input: [your specific query - make it comprehensive to avoid multiple queries]

OR

OPTION 2 - If you have all the information you need:
Thought: [explain why you have enough information]
Final Answer: [your detailed response in Trump's style]

NEVER include both an Action and a Final Answer in the same response.
Each response must end with EITHER an Action OR a Final Answer, never both.
If you use an Action, wait for the result before giving a Final Answer.

Question: {input}
{agent_scratchpad}`);

// Create the agent with specified model
async function createAgent(modelProvider: ModelProvider = 'openai', config?: Partial<AgentConfig>) {
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
    maxIterations: config?.maxIterations ?? 5,
    verbose: config?.verbose ?? false,
    returnIntermediateSteps: config?.returnIntermediateSteps ?? true,
  });
}

// Function to run the agent
export async function runAgent(
  input: string, 
  modelProvider: ModelProvider = 'openai',
  config?: Partial<AgentConfig>
): Promise<string> {
  console.log('\n🤖 Started:', input);
  console.log('🔧 Using:', modelProvider);
  
  try {
    const agentExecutor = await createAgent(modelProvider, config);
    const result = await agentExecutor.invoke({
      input,
    }) as AgentResult;
    
    // Log steps in a minimal way
    const steps = result.intermediateSteps;
    if (steps && steps.length > 0) {
      console.log('\n📋 Steps:');
      steps.forEach((step: AgentStep, index: number) => {
        if (step.action) {
          console.log(`${index + 1}. ${step.action.tool}: "${step.action.toolInput}"`);
        }
        
        if (step.observation) {
          try {
            const observation: ToolObservation = JSON.parse(step.observation);
            if (observation.success) {
              // Show success indicator
              console.log(`   ✓ Success`);
              
              // Show the full answer for Perplexity and Pinecone responses
              if (step.action?.tool === 'perplexity_assistant' || step.action?.tool === 'pinecone_assistant') {
                console.log('   Response:');
                console.log('   --------');
                console.log('  ', observation.answer || observation.data?.response || '');
                console.log('   --------');
              } else {
                // For other tools, keep the truncated format
                const answer = observation.answer || observation.message || '';
                const truncated = answer.length > 150 
                  ? answer.substring(0, 150) + '...'
                  : answer;
                console.log(`   ${truncated}`);
              }
            } else {
              console.log(`   ✗ ${observation.message}`);
            }
          } catch {
            // If not JSON, show minimal error
            console.log('   ✗ Failed to parse response');
          }
        }
      });
    }
    
    console.log('\n💬 Response:');
    // Remove the "Question: ..." line from the output
    const cleanedOutput = result.output.replace(/^Question:.*?\n/, '').trim();
    console.log(cleanedOutput);
    console.log('\n✅ Complete\n');
    return cleanedOutput;
    
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    console.log('\n❌ Failed\n');
    return "Sorry, I encountered an error while processing your request.";
  }
} 