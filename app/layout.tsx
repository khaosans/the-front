'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import TopBar from '@/components/TopBar';

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider attribute="class">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}