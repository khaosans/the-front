'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Message } from '@/types';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function ChatBot({ chatId }: { chatId?: string }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (chatId) {
      // Load chat history from local storage or API
      const savedMessages = window.localStorage.getItem(`chat_${chatId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, [chatId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let botMessage = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        botMessage += new TextDecoder().decode(value);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: botMessage },
        ]);
      }

      if (!chatId) {
        const newChatId = Date.now().toString();
        window.localStorage.setItem(`chat_${newChatId}`, JSON.stringify([...messages, { role: 'assistant', content: botMessage }]));
        router.push(`/chat/${newChatId}`);
      } else {
        window.localStorage.setItem(`chat_${chatId}`, JSON.stringify([...messages, { role: 'assistant', content: botMessage }]));
      }
    } catch (error) {
      console.error('Error in chat:', error);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-grow overflow-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.content}
            </span>
          </div>
        ))}
      </CardContent>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
        </form>
      </div>
    </Card>
  );
}