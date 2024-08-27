import { NextResponse } from 'next/server'

export async function GET() {
  // Replace this with your actual authentication logic
  const isAuthenticated = true // This should be determined by your auth mechanism

  return NextResponse.json({ isAuthenticated })
}