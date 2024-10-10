import React from 'react';

const mockPortfolio = [
  { name: 'Ethereum', symbol: 'ETH', amount: 2.5, value: 5000 },
  { name: 'Bitcoin', symbol: 'BTC', amount: 0.1, value: 3000 },
  { name: 'Cardano', symbol: 'ADA', amount: 1000, value: 500 },
];

const Portfolio: React.FC = () => {
  const totalValue = mockPortfolio.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="bg-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Portfolio Overview</h3>
      <div className="space-y-4">
        {mockPortfolio.map((asset) => (
          <div key={asset.symbol} className="flex justify-between items-center">
            <div>
              <span className="font-medium text-white">{asset.name}</span>
              <span className="text-gray-400 ml-2">({asset.symbol})</span>
            </div>
            <div>
              <span className="font-medium text-green-400">${asset.value.toFixed(2)}</span>
              <span className="text-gray-400 ml-2">({asset.amount} {asset.symbol})</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-600">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total Value:</span>
          <span className="text-lg font-semibold text-green-400">${totalValue.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
