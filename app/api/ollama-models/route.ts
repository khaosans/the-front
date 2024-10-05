import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:11434/api/tags');
    const data = await response.json();

    const models = data.models.map((model: any) => ({
      name: model.name,
      size: model.size || 'Unknown'
    }));

    return NextResponse.json({ models });
  } catch (error) {
    console.error('Error fetching Ollama models:', error);
    return NextResponse.json({ error: 'Failed to fetch Ollama models' }, { status: 500 });
  }
}