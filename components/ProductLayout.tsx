'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import CommonLayout from '@/components/CommonLayout';
import TopBar from '@/components/TopBar';
import { useWallet } from '@/contexts/WalletContext';

interface ProductLayoutProps {
  children: React.ReactNode;
}

interface ProductInfo {
  name: string;
  links: Array<{ href: string; label: string }>;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  const { wallet, setWallet } = useWallet();
  const pathname = usePathname();

  const handleWalletChange = (newWallet: { address: string; type: string } | null) => {
    setWallet(newWallet);
  };

  const getProductInfo = (): ProductInfo => {
    if (pathname === '/') {
      return {
        name: 'Quantum Labs',
        links: [
          { href: "/", label: "Products" },
          { href: "/portfolio", label: "Portfolio" },
          { href: "/defi-dashboard", label: "DeFi Dashboard" },
          { href: "/crypto-prices", label: "Crypto Prices" },
        ]
      };
    } else if (pathname?.startsWith('/defi-dashboard')) {
      return {
        name: 'DeFi Tracker',
        links: [
          { href: "/defi-dashboard", label: "Dashboard" },
          { href: "/portfolio", label: "Portfolio" },
          { href: "/crypto-prices", label: "Crypto Prices" },
          { href: "/", label: "All Products" },
        ]
      };
    } else if (pathname?.startsWith('/crypto-prices')) {
      return {
        name: 'Crypto Prices',
        links: [
          { href: "/crypto-prices", label: "Prices" },
          { href: "/defi-dashboard", label: "DeFi Dashboard" },
          { href: "/portfolio", label: "Portfolio" },
          { href: "/", label: "All Products" },
        ]
      };
    }
    return { name: 'Quantum Labs', links: [] };
  };

  const { name, links } = getProductInfo();

  return (
    <CommonLayout>
      <TopBar 
        onWalletChange={handleWalletChange} 
        selectedWallet={wallet} 
        productName={name}
        productLinks={links}
      />
      <main className="main-content pt-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100 dark:bg-gray-900">
        {children}
      </main>
    </CommonLayout>
  );
};

export default ProductLayout;