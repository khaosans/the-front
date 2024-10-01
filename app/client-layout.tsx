'use client'

import React, { useState } from 'react'
import { useTheme } from './contexts/ThemeContext'
import ChatIcon from '../components/chat-icon'
import { ChatBotModal } from '@/components/chat-bot-modal'
import CodeEditorIcon from '../components/code-editor-icon'
import { MoncacoEditor } from '@/components/moncaco-editor'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Footer from "@/components/footer"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { getThemeClasses } = useTheme()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  return (
    <div className={`min-h-screen flex flex-col ${getThemeClasses()}`}>
      <main className="flex-grow pb-20">{children}</main>
      <Footer />
      <ChatIcon onClick={() => setIsChatOpen(true)} />
      <CodeEditorIcon onClick={() => setIsEditorOpen(true)} />
      <ChatBotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-4xl bg-gray-600 dark:bg-gray-800 p-3 rounded-lg relative">
            <Button
              className="absolute top-2 right-2 p-2"
              variant="ghost"
              onClick={() => setIsEditorOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <MoncacoEditor
              onSave={(value) => {
                console.log('Saved:', value)
                setIsEditorOpen(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}