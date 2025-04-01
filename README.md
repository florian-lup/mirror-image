# Mirror Image

A personal website with AI-powered chat using Pinecone Vector DB and LangChain.

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

## Document Ingestion for Pinecone Vector Database

This directory is used to store documents that will be ingested into the Pinecone vector database for semantic search.

## Adding Documents

1. Place your text documents in this directory (or subdirectories)
2. Supported file types: `.txt`
3. Run the ingestion script from the project root:

```bash
npm run ingest
```

## Document Guidelines

- Documents should be plain text (`.txt`) files
- Each document should contain relevant information you want to be able to search and retrieve
- The ingestion process will split documents into smaller chunks and create embeddings

## Notes

- Documents are chunked at approximately 1000 characters with 200 character overlaps
- All files in this directory and its subdirectories will be processed
- The ingestion process might take some time depending on the number and size of documents

## Environment Variables

- `OPENAI_API`: Your OpenAI API key for generating embeddings and responses
- `PINECONE_API_KEY`: Your Pinecone API key for vector storage
- `PINECONE_INDEX_NAME`: Name of your Pinecone index

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
```
