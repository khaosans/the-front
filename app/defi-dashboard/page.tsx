import React from 'react';
import CommonLayout from '@/components/CommonLayout';
import Portfolio from '@/components/Portfolio';
import RotatingCryptoChart from '@/components/RotatingCryptoChart';
import { fetchEthGasPrice } from '@/lib/etherscan';
import { fetchTopCryptos, fetchTop100Cryptos } from '@/lib/coingecko';
import { Redis } from '@upstash/redis';
import 'server-only';

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface PageProps {
  gasPrice: number | null;
  cryptos: CryptoData[];
  top100Cryptos: CryptoData[];
}

async function fetchDashboardData(): Promise<PageProps> {
  try {
    const cacheKey = 'defi_dashboard_data';
    const cacheTTL = 300; // Cache for 5 minutes (300 seconds)

    // Try to get data from cache
    const cachedData = await redis.get(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData as string);
    } else {
      const [ethGasPrice, topCryptos, top100Cryptos] = await Promise.all([
        fetchEthGasPrice(),
        fetchTopCryptos(),
        fetchTop100Cryptos(),
      ]);

      const data = {
        gasPrice: ethGasPrice,
        cryptos: topCryptos,
        top100Cryptos: top100Cryptos,
      };

      // Store the data in cache
      await redis.set(cacheKey, JSON.stringify(data), { ex: cacheTTL });

      return data;
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      gasPrice: null,
      cryptos: [],
      top100Cryptos: [],
    };
  }
}

export default async function DeFiDashboardPage() {
  const { gasPrice, cryptos, top100Cryptos } = await fetchDashboardData();

  return (
    <CommonLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">DeFi Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Ethereum Gas Price</h2>
            {gasPrice !== null ? (
              <p className="text-xl text-green-400">{gasPrice} Gwei</p>
            ) : (
              <p className="text-gray-400">No gas price data available</p>
            )}
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Top Cryptocurrencies</h2>
            {cryptos.length > 0 ? (
              <ul>
                {cryptos.map((crypto) => (
                  <li key={crypto.id} className="mb-2 text-white">
                    <span className="font-medium">{crypto.name} ({crypto.symbol.toUpperCase()}): </span>
                    ${crypto.current_price.toFixed(2)}
                    <span className={`ml-2 ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No cryptocurrency data available</p>
            )}
          </div>
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Crypto Price Charts</h2>
          <RotatingCryptoChart cryptos={top100Cryptos} />
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Your Portfolio</h2>
          <Portfolio />
        </div>
      </div>
    </CommonLayout>
  );
}