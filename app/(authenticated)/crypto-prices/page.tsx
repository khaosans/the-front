'use client';

import React, { useState, useEffect } from 'react';
import StreamingChart from '@/components/StreamingChart';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CryptoPrices: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch('/api/crypto-prices');
        if (!response.ok) {
          throw new Error('Failed to fetch crypto prices');
        }
        const data = await response.json();
        setCryptoData(data.filter((coin: any) => Math.abs(coin.price_change_percentage_24h) > 5));
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    fetchCryptoPrices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cryptoData.length);
    }, 10000); // Switch every 10 seconds

    return () => clearInterval(interval);
  }, [cryptoData]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Crypto Prices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cryptoData.slice(currentIndex, currentIndex + 2).map((coin) => (
          <Card key={coin.id}>
            <CardHeader>
              <CardTitle>{coin.name} ({coin.symbol.toUpperCase()})</CardTitle>
            </CardHeader>
            <CardContent>
              <StreamingChart data={coin} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptoPrices;