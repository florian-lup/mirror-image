import { NextRequest, NextResponse } from "next/server";
import { initializeRAG, processMessage } from "../langchain";

// Initialize RAG system when the API route is first loaded
let isInitialized = false;

export async function POST(req: NextRequest) {
  try {
    // Initialize RAG system if not already done
    if (!isInitialized) {
      const success = await initializeRAG();
      if (!success) {
        return NextResponse.json(
          { error: "Failed to initialize the chat system" },
          { status: 500 }
        );
      }
      isInitialized = true;
    }

    // Get the message from the request body
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Process the message using LangChain
    const response = await processMessage(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process the message" },
      { status: 500 }
    );
  }
}
