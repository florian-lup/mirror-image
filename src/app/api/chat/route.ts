import { NextRequest, NextResponse } from 'next/server';
import { pinecone } from '@/lib/pinecone';
import { openai } from '@/lib/openai';
import type { ChatMessage } from '@/types/chat';

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: ChatMessage[] };
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
  }

  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUserMsg) {
    return NextResponse.json({ error: 'Last message must be user' }, { status: 400 });
  }

  // 1. Embed user question
  const embedResp = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: lastUserMsg.content,
  });
  const vector = embedResp.data[0].embedding as number[];

  // 2. Query Pinecone
  const index = pinecone.index('flo').namespace('bio');
  const queryResp = await index.query({
    vector,
    topK: 5,
    includeMetadata: true,
  });

  const contextChunks = queryResp.matches?.map((m) => (m.metadata as any)?.text ?? '').filter(Boolean) ?? [];
  const contextText = contextChunks.length
    ? `Relevant context:\n\n${contextChunks.join('\n\n')}\n\n`
    : '';

  // 3. Build prompt with chat history + context
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are Florian\'s personal bio assistant. Use the provided context to answer questions about Florian. If the context is insufficient, answer based on your general knowledge of Florian\'s bio.',
      },
      {
        role: 'system',
        content: contextText,
      },
      ...messages,
    ],
  });

  const assistantReply = chatCompletion.choices[0].message.content;
  return NextResponse.json({ reply: assistantReply });
} 