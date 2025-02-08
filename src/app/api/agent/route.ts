import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from './agent';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const response = await runAgent(message);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Agent error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 