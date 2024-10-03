import { NextResponse } from 'next/server';
import { handleLogin } from './session'; // Import the handleLogin function

export async function POST(request: Request) {
    console.log('Received login request'); // Debug log
    const { email, password } = await request.json();
    console.log('Email:', email); // Log the email for debugging
    return handleLogin(email, password);
}