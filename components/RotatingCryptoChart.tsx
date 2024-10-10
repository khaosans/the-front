'use client';

import React, { useState, useEffect } from 'react';
import CryptoChart from './CryptoChart';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface RotatingCryptoChartProps {
  cryptos: CryptoData[];
}

export default function RotatingCryptoChart({ cryptos }: RotatingCryptoChartProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cryptos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cryptos]);

  if (cryptos.length === 0) {
    return <p className="text-gray-400">No chart data available</p>;
  }

  return <CryptoChart data={cryptos[currentIndex]} />;
}