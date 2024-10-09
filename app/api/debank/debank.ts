import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';

export async function GET(request: NextRequest) {
  logger.info('Starting API request...');
  logger.info(`DEBANK_API_KEY: ${process.env.DEBANK_API_KEY ? 'Set' : 'Not Set'}`);

  const id = request.nextUrl.searchParams.get('id');

  logger.info(`Received request for wallet ID: ${id}`);

  if (!id) {
    logger.warn('Missing wallet address in request');
    return NextResponse.json({ error: 'Missing wallet address' }, { status: 400 });
  }

  const apiKey = process.env.DEBANK_API_KEY;
  if (!apiKey) {
    logger.error('DEBANK_API_KEY is not set');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const url = `https://pro-openapi.debank.com/v1/user/total_balance?id=${id}`;
    logger.info(`Fetching data from DeBank API: ${url}`);

    const response = await fetch(url, {
      headers: {
        'AccessKey': apiKey,
      },
    });

    logger.info(`DeBank API response status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.text(); // Log the response text for debugging
      logger.error(`DeBank API error: ${errorData}`);
      return NextResponse.json({ error: 'Failed to fetch data from DeBank API' }, { status: response.status });
    }

    const data = await response.json();
    logger.info(`Successfully fetched data from DeBank API: ${JSON.stringify(data)}`);
    return NextResponse.json(data);
  } catch (error) {
    logger.error(`Error in DeBank API route: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}