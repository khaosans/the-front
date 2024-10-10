'use client';

import React from 'react';
import TopBar from '@/components/TopBar';
import { useWallet } from '@/contexts/WalletContext';

const DeFiDashboard: React.FC = () => {
  const { wallet } = useWallet();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TopBar 
        onWalletChange={() => {}} // Implement wallet change logic if needed
        selectedWallet={wallet}
        productName="DeFi Dashboard"
        productLinks={[
          { href: "/", label: "Home" },
          { href: "/defi-dashboard", label: "DeFi Dashboard" },
          { href: "/task-flow", label: "Task-Flow" },
          { href: "/portfolio", label: "Portfolio" },
        ]}
      />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-6">DeFi Dashboard</h1>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};

export default DeFiDashboard;