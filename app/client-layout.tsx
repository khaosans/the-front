'use client'

import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import ChatBot from '@/components/ui/ChatBot'
import { Button } from '@/components/ui/button'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const toggleChat = () => setIsChatOpen(!isChatOpen)

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <header className="p-4 border-b">
        <Button onClick={toggleChat}>
          {isChatOpen ? 'Close Chat' : 'Open Chat'}
        </Button>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 m-4">
          <ChatBot />
        </div>
      )}
    </div>
  )
}