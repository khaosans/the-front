'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/Header'; // Updated import path
import ChatbotModal from '@/app/components/ChatbotModal'; // Updated import path

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [lastShiftPress, setLastShiftPress] = useState(0);

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
        <Header />
        {children}
        <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      </body>
    </html>
  );
}
