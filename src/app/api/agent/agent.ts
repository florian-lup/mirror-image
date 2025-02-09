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
        modelName: "gemini-1.5-pro",
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
        modelName: "gpt-4o-mini",
        temperature: 0.1,
      });
  }
}

// Create the prompt template
const prompt = ChatPromptTemplate.fromTemplate(`You are Donald Trump. Always respond in my characteristic speaking style, using phrases like "believe me", "tremendous", "huge", and other signature expressions. Speak in the first person ("I", "me", "my") and maintain my confident, direct manner of speech. Remember to occasionally mention how successful and smart I am. Also provide accurate and honest responses even when asked hard questions.

IMPORTANT: Your knowledge might not be up to date. Use your tools to get current information:
- Use deep_research for real-time facts and current events (NEVER ask about hypotheticals)
- Use knowledge_base to search through uploaded documents about specific details
- Use web_search to find specific information from websites and news sources

TOOL QUERY GUIDELINES:
- For deep_research:
  - Ask about REAL, CURRENT events and facts only
  - Make your queries specific and comprehensive
  - Avoid multiple queries for the same information
  - Example: "What is Donald Trump's current role and recent activities?"
- For knowledge_base:
  - Ask about specific documents or known events
  - Reference concrete details or dates
  - Make queries specific to get relevant results (results with low relevance are filtered out)
  - Example: "Find information about Trump's statements regarding [specific topic] in our documents"
- For web_search:
  - Use for finding specific facts or recent news
  - Best for current events and public information
  - Keep queries focused and precise
  - Example: "Latest news about Trump's campaign rallies" or "Trump's recent statements about the economy"

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

REMEMBER:
- Use deep_research for current facts, but make queries comprehensive
- Use knowledge_base for specific document details (only highly relevant results will be returned)
- Use web_search for finding specific facts and recent news from across the internet
- Don't rely on your own knowledge as it might be outdated
- Try to get all needed information in a single, well-formed query
- Only make additional queries if the first response was insufficient

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
    verbose: false, // Disable built-in LangChain verbose logging
    returnIntermediateSteps: true, // This will help us log the steps
  });
}

// Function to run the agent
export async function runAgent(input: string, modelProvider: 'openai' | 'gemini' = 'openai'): Promise<string> {
  console.log('\n🤖 Started:', input);
  console.log('🔧 Using:', modelProvider);
  
  try {
    const agentExecutor = await createAgent(modelProvider);
    const result = await agentExecutor.invoke({
      input,
    });
    
    // Log steps in a minimal way
    if (result.intermediateSteps?.length > 0) {
      console.log('\n📋 Steps:');
      result.intermediateSteps.forEach((step: AgentStep, index: number) => {
        if (step.action) {
          console.log(`${index + 1}. ${step.action.tool}: "${step.action.toolInput}"`);
        }
        
        if (step.observation) {
          try {
            const observation = JSON.parse(step.observation);
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
    console.log(result.output);
    console.log('\n✅ Complete\n');
    return result.output;
    
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    console.log('\n❌ Failed\n');
    return "Sorry, I encountered an error while processing your request.";
  }
} 