import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/utils/session';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(); // Retrieve session data
    const body = await req.json();
    console.log('Incoming request body:', body); // Log the incoming request body

    const messages = body?.messages || (body?.message ? [{ role: 'user', content: body.message }] : null);

    // Check for valid messages format
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid messages format:', messages); // Log the invalid format
      throw new Error('Invalid messages format. Expected an array of messages.');
    }

    console.log('Received messages:', messages); // Log received messages

    // Use session data to personalize the response
    const userName = session?.user?.name || 'User';

    // Prepare the request to the external API
    const response = await fetch('http://localhost:11434/v1/chat/completions', { // Updated URL for Ollama API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2', // Ensure the model is correctly set
        messages: messages,
        stream: true
      })
    });

    console.log('Response from external API:', response.status); // Log the response status

    if (!response.ok) {
      const errorText = await response.text(); // Get the error message from the response
      console.error('Error response from external API:', errorText); // Log the error message
      throw new Error(`Failed to fetch response: ${response.status} - ${errorText}`);
    }

    if (!response.body) {
      console.error('Response body is null');
      throw new Error('Response body is null');
    }

    const stream = new ReadableStream({
      async start(controller: ReadableStreamDefaultController) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder(); // Use global TextDecoder

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          console.log('Streaming chunk:', chunk); // Log each chunk received
          controller.enqueue(chunk);
        }

        controller.close();
      }
    });

    return new NextResponse(stream, {
      headers: { 'Content-Type': 'text/event-stream' }
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return new NextResponse(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
