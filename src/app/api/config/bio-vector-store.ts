import { Index } from "@upstash/vector";

export interface VectorQueryResult {
  id: string | number;
  score: number;
  data?: string;
}

export const bioVectorIndex = new Index({
  url: process.env.BIO_UPSTASH_VECTOR_REST_URL!,
  token: process.env.BIO_UPSTASH_VECTOR_REST_TOKEN!,
}); 