import { NextResponse } from 'next/server';
import { handleLogin } from '@/components/session';
import { getChatCompletion } from '@/lib/ollama'; // Import the chat completion function

export async function POST(request: Request) {
    // eslint-disable-next-line no-console
    console.log('Received login request'); // Debug log
    const { email, password, chatInput } = await request.json(); // Include chatInput for chat completion
    // eslint-disable-next-line no-console
    console.log('Email:', email); // Log the email for debugging

    // Handle login
    const loginResponse = await handleLogin(email, password);

    // If login is successful, get chat completion
    if (loginResponse && loginResponse.success) {
        const chatResponse = await getChatCompletion(chatInput); // Get chat completion response
        return NextResponse.json({ loginResponse, chatResponse }); // Return both responses
    }

    return NextResponse.json({ loginResponse });
}