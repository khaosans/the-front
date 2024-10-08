'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { Web3ReactProvider } from '@web3-react/core';
import { providers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY || '7b6b6fe8a6c64deb8de680fe7d699b25';
const OPTIMISM_MAINNET_URL = `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`;

const injected = new InjectedConnector({ supportedChainIds: [10] }); // 10 is the chain ID for Optimism

const [network, networkHooks] = initializeConnector<Network>(
  (actions) => new Network({ actions, urlMap: { 10: OPTIMISM_MAINNET_URL }, defaultChainId: 10 })
);

const connectors = [
  [injected, networkHooks],
  [network, networkHooks]
];

function getLibrary(provider: any): providers.Web3Provider {
  return new providers.Web3Provider(provider);
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Web3ReactProvider connectors={connectors}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        {/* @ts-ignore */}
                        <Layout>{children}</Layout>
                    </ThemeProvider>
                </Web3ReactProvider>
            </body>
        </html>
    )
}