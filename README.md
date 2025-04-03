# Mirror Image

A Retrieval-Augmented Generation (RAG) system designed to answer questions about my background and expertise. It uses LangChain, Pinecone, and OpenAI models.

## Features

- **Retrieval-Augmented Generation (RAG):** Combines document retrieval with large language models for accurate, context-aware answers.
- **Vector Database:** Utilizes Pinecone for efficient storage and retrieval of document embeddings.
- **Semantic Search:** Employs OpenAI embeddings for understanding document content.
- **Modular Framework:** Built with LangChain for streamlined document processing and interaction.

## Prerequisites

- Node.js (e.g., v18.x or later recommended)
- npm or yarn
- Access to OpenAI API
- Access to Pinecone API

## Setup

1.  **Clone the Repository:**

    ```bash
    git clone <your-repository-url> # Replace with actual URL
    cd mirror-image
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the project root. Add your API keys and index name:

    ```dotenv
    # .env.local
    OPENAI_API_KEY=your_openai_api_key
    PINECONE_API_KEY=your_pinecone_api_key
    PINECONE_INDEX_NAME=your_pinecone_index_name
    ```

4.  **Prepare Documents:**
    Place your source documents (currently supports `.txt` files) into the `documents/` directory.

## Index Management

1.  **Ingest Documents:**
    Run the ingestion script to process your documents, generate embeddings, and store them in Pinecone:

    ```bash
    npm run ingest
    # or
    yarn ingest
    ```

    This step populates the vector database, making your documents searchable.

2.  **Delete Records:**
    The `clean-index` script allows you to reset your Pinecone index. This is useful for:

    - Starting over with a fresh set of documents.
    - Removing outdated or irrelevant data.
    - Testing the ingestion process.

    ```bash
    # CAUTION: This will permanently delete all vector data in your index!
    npm run clean-index
    # or
    yarn clean-index
    ```

## Usage

1.  **Start the Application:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Available Scripts

The `package.json` includes several scripts for development and management:

- `npm run dev` or `yarn dev`: Starts the development server/application.
- `npm run build` or `yarn build`: Builds the application for production.
- `npm run start` or `yarn start`: Starts the production server (requires a prior build).
- `npm run ingest` or `yarn ingest`: Processes and ingests documents into the Pinecone index.
- `npm run clean-index` or `yarn clean-index`: **Warning:** Deletes all records from the configured Pinecone index. Use with caution.
