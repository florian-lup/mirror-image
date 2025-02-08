import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from './agent';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const modelProvider = process.env.MODEL_PROVIDER as 'openai' | 'gemini' || 'openai';
    const response = await runAgent(message, modelProvider);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Agent error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 