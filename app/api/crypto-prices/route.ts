import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import logger from '@/lib/logger';

const CACHE_TTL = 60 * 5; // 5 minutes

export async function GET(req: NextRequest) {
  try {
    const cachedData = await kv.get('crypto-prices');
    if (cachedData) {
      logger.info('Retrieved crypto prices from cache');
      return NextResponse.json(cachedData);
    }

    logger.info('Fetching crypto prices from CoinGecko');
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d'
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    const data = await response.json();
    await kv.set('crypto-prices', data, { ex: CACHE_TTL });
    logger.info('Stored crypto prices in cache');

    return NextResponse.json(data);
  } catch (error) {
    logger.error(`Error fetching crypto prices: ${(error as Error).message}`);
    return NextResponse.json({ error: 'Failed to fetch crypto prices' }, { status: 500 });
  }
}