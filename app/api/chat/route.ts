import { NextRequest, NextResponse } from 'next/server';

// Remove the Edge runtime specification
// export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Process the chat message here
    // For now, let's just echo the message back

    return NextResponse.json({ reply: `You said: ${message}` });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
