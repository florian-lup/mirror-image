# Mirror Image

A RAG system using LangChain, Pinecone, and GPT-4.5 to answer questions about my background and expertise.

## Features

- RAG (Retrieval Augmented Generation) using Pinecone vector database
- Semantic search via OpenAI embeddings
- LangChain integration for document retrieval

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with the required environment variables:
   ```
   OPENAI_API=your_openai_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX_NAME=your_pinecone_index_name
   ```
4. Add your documents in the `documents` directory
5. Run the ingestion script: `npm run ingest`
6. Start the development server: `npm run dev`

## Document Ingestion

1. Add your documents to the `/documents` folder (currently supporting .txt files)
2. Run the document ingestion script:

```bash
npm run ingest
# or
yarn ingest
```

This script will:

- Load documents from the specified directory
- Split them into smaller chunks
- Generate embeddings using OpenAI
- Store the embeddings in Pinecone for fast retrieval

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Ingest documents into Pinecone
npm run ingest

# Clean all records from Pinecone index
npm run clean-index
```

## Index Management

To clean up your Pinecone index and remove all records, you can use:

```bash
npm run clean-index
```

This is useful when you want to:

- Start fresh with a clean index
- Remove outdated or incorrect data
- Reset the vector database for testing
