import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import { WalletProvider } from '@/contexts/WalletContext';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white">
        <ClerkProvider>
          <WalletProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
              {children}
            </ThemeProvider>
          </WalletProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}