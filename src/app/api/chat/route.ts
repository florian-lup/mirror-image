import { NextRequest, NextResponse } from "next/server";
import { processMessage } from "../langchain";

export async function POST(req: NextRequest) {
  try {
    // Get the message from the request body
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Process the message using LangChain
    const answer = await processMessage(message);

    return NextResponse.json({ 
      response: answer 
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process the message" },
      { status: 500 }
    );
  }
}
