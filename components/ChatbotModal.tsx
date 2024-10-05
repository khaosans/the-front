'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log('Ollama response:', data);
    } catch (error) {
      console.error('Error connecting to Ollama:', error);
    }
  };

  return (
    <Dialog isOpen={isOpen} onDismiss={onClose} className="chatbot-modal">
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent
        className="bg-gray-800 text-white max-w-3xl mx-auto p-6 rounded-lg shadow-lg"
        aria-label="Chatbot"
        // Ensure no laser effect is applied here
        style={{ background: 'none' }} // Remove any unwanted background effects
      >
        <h2 className="text-2xl font-bold mb-4">Chat with Ollama</h2>
        <div className="chatbot-content mb-4">
          <textarea
            className="w-full p-2 bg-gray-700 text-white rounded"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
        </div>
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Send
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotModal;