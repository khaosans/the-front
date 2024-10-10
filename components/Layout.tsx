'use client';

import React, { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import { usePathname } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const [selectedWallet, setSelectedWallet] = useState<{ address: string; type: string } | null>(null);

    const routesWithoutTopBar = ['/login', '/signup'];
    const showTopBar = pathname ? !routesWithoutTopBar.includes(pathname) : true;

    useEffect(() => {
        const savedWallet = localStorage.getItem('selectedWallet');
        if (savedWallet) {
            setSelectedWallet(JSON.parse(savedWallet));
        }
    }, []);

    const handleWalletChange = (wallet: { address: string; type: string } | null) => {
        setSelectedWallet(wallet);
        if (wallet) {
            localStorage.setItem('selectedWallet', JSON.stringify(wallet));
        } else {
            localStorage.removeItem('selectedWallet');
        }
    };

    return (
        <>
            {showTopBar && (
                <TopBar 
                    onWalletChange={handleWalletChange}
                    selectedWallet={selectedWallet}
                    productName="Quantum Labs" 
                    productLinks={[]} 
                />
            )}
            <main>{children}</main>
        </>
    );
};

export default Layout;