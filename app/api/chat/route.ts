import { NextRequest } from 'next/server';
// Importing necessary types for Node.js
import { ReadableStream } from 'stream/web'; // Ensure this import is available
import { Response } from 'node-fetch'; // Ensure this import is available

export async function POST(req: NextRequest) {
  const { message, model } = await req.json();

  // Log the incoming request data for debugging
  console.log('Incoming request:', { message, model });

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: message }],
        stream: true,
      }),
    });

    // Log the response status and body for debugging
    console.log('Response from external API:', {
      status: response.status,
      statusText: response.statusText,
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorText = await response.text(); // Capture the error response
      console.error('Error response from external API:', errorText);
      throw new Error(`Failed to fetch from Ollama: ${response.status} ${response.statusText}`);
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;
          const chunk = new TextDecoder().decode(value);
          try {
            const parsed = JSON.parse(chunk);
            if (parsed.message?.content) {
              controller.enqueue(parsed.message.content);
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
