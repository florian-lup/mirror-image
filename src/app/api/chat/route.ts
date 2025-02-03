import { NextResponse } from "next/server";
import { generateChatResponse } from "../services/chat";
import type { ChatRequest, ChatResponse, ErrorResponse } from "../types/chat";

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as ChatRequest;

    if (!message) {
      return NextResponse.json<ErrorResponse>(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await generateChatResponse(message);
    return NextResponse.json<ChatResponse>({ response });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json<ErrorResponse>(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
