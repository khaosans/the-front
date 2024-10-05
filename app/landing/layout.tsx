'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import '@/styles/globals.css';
import ChatbotModal from "@/components/ChatbotModal";
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <RobotTransformerWallpaper />
          <div className="relative z-10">
            {children}
            <button onClick={() => setIsChatbotOpen(true)} className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Open Chatbot
            </button>
            <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
