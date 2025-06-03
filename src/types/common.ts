import * as React from 'react';

export type WithChildren = {
  children: React.ReactNode;
};

export interface ApiError {
  error: string;
}

export type ApiSuccess<T> = { data: T };

export type ApiResponse<T> = ApiSuccess<T> | ApiError; 