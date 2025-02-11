// Common API Response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Common API Error type
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// Common Pagination type
export interface PaginationParams {
  page: number;
  limit: number;
}

// Common Sort type
export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
} 