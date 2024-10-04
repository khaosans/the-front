'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ChatHistory() {
  const [chats, setChats] = useState<string[]>([]);

  useEffect(() => {
    const chatIds = Object.keys(localStorage)
      .filter((key) => key.startsWith('chat_'))
      .map((key) => key.replace('chat_', ''));
    setChats(chatIds);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      <ul className="space-y-2">
        {chats.map((chatId) => (
          <li key={chatId}>
            <Link href={`/chat/${chatId}`} passHref>
              <Button variant="outline" className="w-full justify-start">
                Chat {chatId}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}