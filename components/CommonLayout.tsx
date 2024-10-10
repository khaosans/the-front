'use client';

import React from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { ThemeProvider } from 'next-themes';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';
import TopBar from '@/components/TopBar';

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  const { wallet, setWallet } = useWallet();

  const handleWalletChange = (newWallet: { address: string; type: string } | null) => {
    setWallet(newWallet);
    if (typeof window !== 'undefined') {
      if (newWallet) {
        localStorage.setItem('connectedWallet', JSON.stringify(newWallet));
      } else {
        localStorage.removeItem('connectedWallet');
      }
    }
  };

  return (
    <ThemeProvider attribute="class">
      <RobotTransformerWallpaper />
      <TopBar onWalletChange={handleWalletChange} selectedWallet={wallet} />
      <main className="main-content dark:bg-gray-900 dark:text-white">
        {children}
      </main>
    </ThemeProvider>
  );
};

export default CommonLayout;