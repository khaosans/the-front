'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Updated import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from '../app/contexts/ThemeContext';

type Persona = 'Engineering' | 'QA' | 'Product Manager' | 'Customer'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
}

interface ChatbotModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatBotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [persona, setPersona] = useState<Persona>('Engineering');
  const [modalSize, setModalSize] = useState({ width: 500, height: 600 });
  const resizeRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: 'user',
      }
      setMessages([...messages, newMessage])
      setInputMessage('')

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `${persona} persona: I've received your message and I'm processing it.`,
          sender: 'bot',
        }
        setMessages(prevMessages => [...prevMessages, botResponse])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    const resizeModal = (e: MouseEvent) => {
      if (resizeRef.current) {
        const newWidth = e.clientX - resizeRef.current.getBoundingClientRect().left;
        const newHeight = e.clientY - resizeRef.current.getBoundingClientRect().top;
        setModalSize({ width: newWidth, height: newHeight });
      }
    };

    const stopResize = () => {
      window.removeEventListener('mousemove', resizeModal);
      window.removeEventListener('mouseup', stopResize);
    };

    const startResize = (e: MouseEvent) => {
      e.preventDefault();
      window.addEventListener('mousemove', resizeModal);
      window.addEventListener('mouseup', stopResize);
    };

    const resizeHandle = resizeRef.current;
    if (resizeHandle) {
      resizeHandle.addEventListener('mousedown', startResize as EventListener);
    }

    return () => {
      if (resizeHandle) {
        resizeHandle.removeEventListener('mousedown', startResize as EventListener);
      }
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[500px] ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Chatbot Assistant</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[500px]">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm font-medium">Current Persona:</span>
            <Select value={persona} onValueChange={(value: Persona) => setPersona(value)}>
              <SelectTrigger className={`w-[180px] ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}>
                <SelectValue placeholder="Select a persona" />
              </SelectTrigger>
              <SelectContent className={isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="QA">QA</SelectItem>
                <SelectItem value="Product Manager">Product Manager</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className={`flex-grow border rounded-md p-4 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                <div
                  className={`flex items-start ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={message.sender === 'user' ? '/user-avatar.png' : '/bot-avatar.png'}
                      alt={message.sender === 'user' ? 'User' : 'Bot'}
                    />
                    <AvatarFallback>{message.sender === 'user' ? 'U' : 'B'}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`mx-2 p-3 rounded-lg ${
                      message.sender === 'user'
                        ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-gray-900'
                        : isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center space-x-2 mt-4">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className={`flex-grow ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
            />
            <Button onClick={handleSendMessage} className={isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}>Send</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
