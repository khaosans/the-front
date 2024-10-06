'use client';

import React from 'react';
import TopBar from './TopBar';
import { usePathname } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();

    // Add routes where you don't want the TopBar to appear
    const routesWithoutTopBar = ['/login', '/register', '/landing'];

    const showTopBar = !routesWithoutTopBar.includes(pathname);

    return (
        <>
            {showTopBar && <TopBar />}
            <main>{children}</main>
        </>
    );
};

export default Layout;