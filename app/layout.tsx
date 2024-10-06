'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import TopBar from '@/components/TopBar';

interface LayoutProps {
    children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <ThemeProvider attribute="class">
                    <TopBar />
                    <div className="container mx-auto py-10">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
