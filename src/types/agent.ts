import { DynamicStructuredTool } from "@langchain/core/tools";
import { AgentStep } from "@langchain/core/agents";

/**
 * Represents the current state of the agent during its execution cycle.
 * Tracks the input, thought process, actions, observations, and final answer.
 */
export interface AgentState {
  input: string;
  thought?: string;
  action?: AgentAction;
  observation?: string;
  final_answer?: string;
}

/**
 * Defines an action that the agent can take.
 * Each action has a name and associated arguments.
 */
export interface AgentAction {
  name: string;
  args: {
    input: string;
  };
}

/**
 * Represents the final output when an agent completes its task.
 * Contains the return values and a log of the process.
 */
export interface AgentFinish {
  return_values: {
    output: string;
  };
  log: string;
}

/**
 * Type alias for DynamicStructuredTool from LangChain.
 * Represents a tool that the agent can use to perform actions.
 */
export type Tool = DynamicStructuredTool;

/**
 * Supported AI model providers for the agent.
 */
export type ModelProvider = 'openai' | 'gemini';

/**
 * Configuration options for creating an agent.
 */
export interface AgentConfig {
  maxIterations?: number;
  verbose?: boolean;
  returnIntermediateSteps?: boolean;
}

/**
 * Common schema for tool inputs that accept either string or object with query
 */
export type ToolInput = string | {
  query: string;
};

/**
 * Standard response format for tool executions.
 * Includes success status, message, and the actual response.
 */
export interface ToolResponse {
  success: boolean;
  message: string;
  response: string;
}

/**
 * Structure for tool observation responses.
 * Used when parsing tool execution results.
 */
export interface ToolObservation {
  success: boolean;
  message?: string;
  answer?: string;
  data?: {
    response?: string;
  };
}

/**
 * Represents a message in the research conversation.
 * Can be from the system, user, or assistant.
 */
export interface ResearchMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Structure of a web search result.
 * Contains the title, snippet, and link of the search result.
 */
export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

/**
 * Response structure from the Perplexity API used in DeepResearch
 */
export interface PerplexityResponse {
  choices: Array<{
    message?: {
      content: string;
    };
  }>;
}

/**
 * Response structure from the SERP API used in WebSearch
 */
export interface SerpApiResponse {
  organic_results: SearchResult[];
}

/**
 * Response structure from Upstash Vector used in KnowledgeBase
 */
export interface VectorSearchResult {
  score: number;
  data?: string;
  metadata?: Record<string, unknown>;
  vector?: number[];
}

/**
 * Configuration for vector search queries
 */
export interface VectorSearchConfig {
  data: string;
  topK: number;
  includeMetadata: boolean;
  includeVectors: boolean;
  includeData: boolean;
}

/**
 * Represents the result of an agent execution.
 * Includes the output and any intermediate steps taken.
 */
export interface AgentResult {
  output: string;
  intermediateSteps?: AgentStep[];
} 