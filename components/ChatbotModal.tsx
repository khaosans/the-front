'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Here you would typically send the message to your chatbot API
      // and then add the response to the messages
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I'm a mock response from the chatbot!", sender: 'bot' }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chatbot Assistant</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] p-4 border rounded">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {message.text}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="flex mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button onClick={handleSend} className="ml-2">Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotModal;