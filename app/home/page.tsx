'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const streamingMessageRef = useRef('');

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, `You: ${inputMessage}`]);
    setInputMessage('');
    setIsStreaming(true);
    streamingMessageRef.current = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = new TextDecoder().decode(value);
        streamingMessageRef.current += text;
        setMessages(prev => [...prev.slice(0, -1), `AI: ${streamingMessageRef.current}`]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, `Error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg}
          </div>
        ))}
        {isStreaming && <div className="mb-2">AI is typing...</div>}
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
          disabled={isStreaming}
        />
        <button
          onClick={sendMessage}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isStreaming}
        >
          Send
        </button>
      </div>
    </div>
  );
}