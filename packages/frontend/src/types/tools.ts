/**
 * Base interface for tool inputs
 */
export type ToolInput = string | Record<string, unknown>;

/**
 * Standard response format for all tools
 */
export interface ToolResponse {
  success: boolean;
  message: string;
  response: string;
}

/**
 * Interface for SERP API search results
 */
export interface SerpApiResponse {
  organic_results?: SearchResult[];
}

/**
 * Interface for web search results
 */
export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

/**
 * Interface for research messages
 */
export interface ResearchMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Interface for Perplexity API responses
 */
export interface PerplexityResponse {
  text: string;
  choices?: Array<{ text: string }>;
}

/**
 * Interface for vector search results
 */
export interface VectorSearchResult {
  id: string;
  score: number;
  content: string;
  metadata?: Record<string, unknown>;
  data?: unknown;
}

/**
 * Configuration for vector search
 */
export interface VectorSearchConfig {
  limit?: number;
  filters?: Record<string, unknown>;
  data?: unknown;
} 