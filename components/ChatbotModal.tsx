'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatbotModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    console.log("Message sent:", message);
    setMessage(''); // Clear the input after sending
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Chatbot</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex-grow">
            <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-4">
              <div className="text-gray-700">Chatbot: How can I assist you today?</div>
              <div className="text-gray-700">User: I need help with my project.</div>
            </div>
          </div>
          <div className="flex">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button onClick={handleSend} className="bg-blue-500 text-white">
              Send
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mt-4">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotModal;