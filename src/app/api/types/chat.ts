// Request types
export interface ChatRequest {
  message: string;
}

// Response types
export interface ChatResponse {
  response: string;
}

export interface ErrorResponse {
  error: string;
}

// Service types
export interface VectorSearchResult {
  id: string | number;
  score: number;
  data?: string;
}

// Memory types
export interface ChatMemoryVariables {
  chat_history?: Array<{
    type: 'constructor';
    id: string[];
    kwargs: {
      content: string;
      additional_kwargs: Record<string, unknown>;
      response_metadata: Record<string, unknown>;
    };
  }>;
}

export interface ChatContext {
  question: string;
  answer: string;
} 