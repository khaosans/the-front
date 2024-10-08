'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import Layout from '@/components/Layout';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Layout>{children}</Layout>
                </ThemeProvider>
            </body>
        </html>
    )
}