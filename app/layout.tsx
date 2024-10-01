'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header'; // Updated import path
import ChatbotModal from '@/components/ChatbotModal'; // Updated import path
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [lastShiftPress, setLastShiftPress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Shift') {
                const now = Date.now();
                if (now - lastShiftPress < 500) {  // 500ms threshold for double press
                    setIsChatbotOpen(true);
                }
                setLastShiftPress(now);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Simulate initial loading
        setTimeout(() => setIsLoading(false), 1000);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lastShiftPress]);

    return (
        <html lang="en">
        <head>
            <title>QuantumLabs</title>
        </head>
        <body className={inter.className}>
        <ThemeProvider>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Header />
                    {children}
                    <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
                </>
            )}
        </ThemeProvider>
        </body>
        </html>
    );
}
