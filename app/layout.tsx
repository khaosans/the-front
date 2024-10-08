'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <Layout>{children}</Layout>
                        <Toaster position="top-right" />
                    </ThemeProvider>
                </Web3ReactProvider>
            </body>
        </html>
    )
}