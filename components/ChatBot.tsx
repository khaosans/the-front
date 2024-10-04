'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ChatBotProps {
    onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setMessages([...messages, inputMessage]);
            setInputMessage('');
            // Here you would typically send the message to your chatbot backend
            // and handle the response
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-96 h-[500px] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Chat</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <span className="bg-blue-100 rounded px-2 py-1">{msg}</span>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t flex">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-1 border rounded-l px-2 py-1"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white px-4 py-1 rounded-r"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;