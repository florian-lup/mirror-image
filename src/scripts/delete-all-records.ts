import { Pinecone } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function main() {
  try {
    console.log("🔄 Starting Pinecone index cleanup process...");

    // Initialize Pinecone client
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    // Get Pinecone index
    const indexName = process.env.PINECONE_INDEX_NAME!;
    console.log(`🌲 Using Pinecone index: ${indexName}`);
    const index = pinecone.Index(indexName);

    // Delete all records from the index
    console.log(`🗑️  Deleting all records from index: ${indexName}...`);
    await index.deleteAll();
    
    console.log(`✅ Successfully deleted all records from Pinecone index: ${indexName}`);
  } catch (error) {
    console.error("❌ Error during index cleanup:", error);
  }
}

// Execute the main function
main().catch(console.error); 