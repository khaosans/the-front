'use client';

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StreamingChartProps {
  data: {
    id: string;
    symbol: string;
    name: string;
    sparkline_in_7d: { price: number[] };
    price_change_percentage_7d_in_currency: number;
  };
}

const StreamingChart: React.FC<StreamingChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const labels = Array.from({ length: 168 }, (_, i) => `${i}h ago`).reverse();
    setChartData({
      labels,
      datasets: [
        {
          label: data.name,
          data: data.sparkline_in_7d.price,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  }, [data]);

  if (!chartData) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2 dark:text-white">{data.name} ({data.symbol.toUpperCase()})</h2>
      <p className="text-sm mb-4 dark:text-gray-300">
        7d Change: {data.price_change_percentage_7d_in_currency.toFixed(2)}%
      </p>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                maxTicksLimit: 8,
                color: 'rgb(156, 163, 175)',
              },
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                color: 'rgb(156, 163, 175)',
              },
              grid: {
                color: 'rgba(156, 163, 175, 0.1)',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default StreamingChart;