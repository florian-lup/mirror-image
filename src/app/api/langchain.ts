import { ChatOpenAI } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Initialize the chat model
const chatModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

// Initialize embeddings
const embeddings = new OpenAIEmbeddings();

// Create a vector store instance
let vectorStore: MemoryVectorStore;

// Initialize the RAG system
export async function initializeRAG() {
  try {
    // Load the bio document
    const loader = new TextLoader("data/bio.txt");
    const docs = await loader.load();

    // Split the text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    const splitDocs = await splitter.splitDocuments(docs);

    // Create and populate the vector store
    vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

    return true;
  } catch (error) {
    console.error("Error initializing RAG:", error);
    return false;
  }
}

// Process a chat message
export async function processMessage(message: string) {
  try {
    // Create a prompt template
    const prompt = ChatPromptTemplate.fromTemplate(`
      Answer the following question based ONLY on the provided context. 
      If you cannot answer the question based on the context, say "I don't have enough information to answer that question."
      
      Context: {context}
      
      Question: {question}
      
      Answer: `);

    // Create a document chain
    const documentChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
    });

    // Create a retrieval chain
    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever: vectorStore.asRetriever(),
    });

    // Process the message
    const response = await retrievalChain.invoke({
      input: message,
    });

    return response.answer;
  } catch (error) {
    console.error("Error processing message:", error);
    return "Sorry, I encountered an error while processing your message.";
  }
} 