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