import { NextResponse } from "next/server";
import { generateChatResponse, ChatRequest, ErrorResponse } from "./services/chat";

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as ChatRequest;

    if (!message) {
      return NextResponse.json<ErrorResponse>(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const stream = await generateChatResponse(message);
    
    // Just pass through the already encoded stream
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json<ErrorResponse>(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
