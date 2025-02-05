import { NextResponse } from "next/server";
import { generateChatResponse } from "../services/chat";
import type { ChatRequest, ErrorResponse } from "../types/chat";

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
    
    const textEncoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(textEncoder.encode(chunk.content.toString()));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json<ErrorResponse>(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
