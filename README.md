# Mirror Image - AI-Powered Bio Chat

A Next.js application that creates an AI-powered chat interface to interact with my professional background. The system uses RAG (Retrieval-Augmented Generation) to find and incorporate relevant information from my CV/bio into natural, first-person responses.

## Tech Stack

- **Framework**: Next.js with TypeScript
- **AI Model**: Gpt-4o & Google's Gemini 1.5 Flash
- **Vector Store**: Upstash Vector
- **LLM Framework**: LangChain

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key
   BIO_UPSTASH_VECTOR_REST_URL=your_upstash_url
   BIO_UPSTASH_VECTOR_REST_TOKEN=your_upstash_token
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
