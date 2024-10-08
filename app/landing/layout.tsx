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
            
            <ChatbotModal onClose={() => setIsChatbotOpen(false)} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
