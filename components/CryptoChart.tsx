import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface CryptoChartProps {
  data: CryptoData;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ data }) => {
  const chartData = {
    labels: ['24h ago', 'Now'],
    datasets: [
      {
        label: data.name,
        data: [data.current_price / (1 + data.price_change_percentage_24h / 100), data.current_price],
        borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        backgroundColor: `hsla(${Math.random() * 360}, 100%, 50%, 0.5)`,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${data.name} (${data.symbol.toUpperCase()}) Price Chart`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default CryptoChart;