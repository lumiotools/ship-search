import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { chatHistory, message, json } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required.' },
        { status: 400 }
      );
    }

    const response = await fetch('https://orchestro-ai-backend.onrender.com/api/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatHistory, message, json }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from Orchestro AI backend.');
    }

    const data = await response.json();
    console.log("*****DATA*****",data,"*****DATA*****")

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
