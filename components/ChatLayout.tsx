'use client';

import React, { useState } from 'react';
import ChatbotModal from '@/components/ChatbotModal';
import { AuthProvider } from './contexts/AuthContext';
import RobotTransformerWallpaper from './RobotTransformerWallpaper';

const ChatLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <AuthProvider>
      <RobotTransformerWallpaper />
      <div className="relative z-10 min-h-screen">
        {children}
        <ChatbotModal onClose={() => setIsChatbotOpen(false)} />
      </div>
    </AuthProvider>
  );
};

export default ChatLayout;