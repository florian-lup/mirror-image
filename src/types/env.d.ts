declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_BASE_URL: string;
    readonly OPENAI_API_KEY: string;
    readonly PINECONE_API_KEY: string;
  }
} 