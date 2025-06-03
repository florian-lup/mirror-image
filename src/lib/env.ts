import { z } from 'zod';

/**
 * Centralised & typed environment variables.
 * NEXT_PUBLIC_* values are exposed to the browser automatically by Next.js.
 * Server-side variables are only available in Node.js runtime.
 */
const schema = z.object({
  // Public variables (exposed to browser)
  NEXT_PUBLIC_BASE_URL: z.string().url(),

  // Server-side variables (secrets)
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  PINECONE_API_KEY: z.string().min(1, 'PINECONE_API_KEY is required'),
});

const _env = schema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
});

export const env = {
  /** Base URL of the deployed site (public) */
  BASE_URL: _env.NEXT_PUBLIC_BASE_URL,

  /** OpenAI API key for LLM operations (server-side only) */
  OPENAI_API_KEY: _env.OPENAI_API_KEY,

  /** Pinecone API key for vector database (server-side only) */
  PINECONE_API_KEY: _env.PINECONE_API_KEY,
} as const;