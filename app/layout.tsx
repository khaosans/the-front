'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext'; // Corrected import path
import '@/styles/globals.css'; // Adjust this path if needed
import TopBar from '@/components/TopBar'; // Import the TopBar component

interface LayoutProps {
    children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <TopBar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;