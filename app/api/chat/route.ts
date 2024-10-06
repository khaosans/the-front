import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Chat API GET endpoint' });
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message) {
    return new Response('Message is required', { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      // Simulate a streaming response
      const words = `Received: ${message}`.split(' ');
      for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 200)); // Delay between words
        controller.enqueue(word + ' ');
      }
      controller.close();
    },
  });

  // Store the message in the database
  await supabase
    .from('messages')
    .insert({ content: message, is_user_message: true });

  return new Response(stream);
}