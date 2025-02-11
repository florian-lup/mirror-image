import { ApiResponse, ApiError } from '../types/api';

// Create a success response
export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data
  };
}

// Create an error response
export function createErrorResponse(error: string | ApiError): ApiResponse<never> {
  return {
    success: false,
    error: typeof error === 'string' ? error : error.message
  };
}

// Validate pagination parameters
export function validatePaginationParams(page: number, limit: number): boolean {
  return page > 0 && limit > 0 && limit <= 100;
} 