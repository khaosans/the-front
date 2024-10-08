'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'; // Import Inter font

import './globals.css';
import TopBar from '@/components/TopBar'; // Import TopBar
import ChatbotModal from '@/components/ChatbotModal'; // Updated import path
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import Loading from './loading';
import { GeistProvider } from '@geist-ui/react';
import ToastContainer from '@/components/ToastContainer'; // Import ToastContainer
import NavBar from '@/components/NavBar'; // Import NavBar
import { getSession } from './utils/session';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        async function checkSession() {
            const sessionData = await getSession();
            setSession(sessionData);
            setIsLoading(false);
        }
        checkSession();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <html lang="en"> {/* Added <html> tag */}
            <head>
                <title>QuantumLabs</title>
            </head>
            <body className={inter.className}> {/* Added <body> tag */}
                <ThemeProvider>
                    <GeistProvider>
                        <TopBar onChatOpen={() => setIsChatbotOpen(true)} />
                        {children}
                        <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
                        <ToastContainer />
                    </GeistProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}