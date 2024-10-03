'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext'; // Adjust the import path as needed

interface LayoutProps {
    children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;