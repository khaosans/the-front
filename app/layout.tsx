'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/TopBar'; // Import TopBar
import ChatbotModal from '@/components/ChatbotModal'; // Updated import path
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import Loading from './loading';
import { GeistProvider } from '@geist-ui/react';
import ToastContainer from '@/components/ToastContainer'; // Import ToastContainer
import NavBar from '@/components/NavBar'; // Import NavBar

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    return (
        <html lang="en">
        <head>
            <title>QuantumLabs</title>
        </head>
        <body className={inter.className}>
        <ThemeProvider>
            <GeistProvider>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <TopBar onChatOpen={() => setIsChatbotOpen(true)} /> {/* Pass the function to open the chat */}
                        {/* Removed the extra NavBar here */}
                        {children}
                        <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
                        <ToastContainer /> {/* Add the ToastContainer here */}
                    </>
                )}
            </GeistProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}