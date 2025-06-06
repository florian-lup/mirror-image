import { NextRequest, NextResponse } from 'next/server';
import type { ChatMessage } from '@/types/chat';
import { chat } from '@/app/actions/chat';

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] | undefined;
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    messages = body.messages;
  } catch (err) {
    console.error('Failed to parse request body', err);
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
  }

  try {
    const reply = await chat(messages);
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
