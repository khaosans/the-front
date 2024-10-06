'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import supabase from '../utils/supabase'; // Adjust the import based on your file structure

interface ChatModalProps {
    onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false); // No loading state needed for local messages

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            // Send message to Supabase
            const { data, error } = await supabase
                .from('messages') // Replace with your actual table name
                .insert([{ content: inputMessage }]); // Adjust based on your table structure

            if (error) {
                console.error('Error sending message to Supabase:', error.message);
                return; // Exit if there's an error
            } else {
                console.log('Message sent to Supabase:', data);
                setMessages((prevMessages) => [...prevMessages, inputMessage]);
                setInputMessage('');

                // Fetch response from Ollama
                const response = await fetchOllamaResponse(inputMessage);
                if (response) {
                    setMessages((prevMessages) => [...prevMessages, response]);
                }
            }
        } else {
            console.warn('Input message is empty.'); // Log if input is empty
        }
    };

    // Function to fetch response from Ollama
    const fetchOllamaResponse = async (message: string) => {
        try {
            const res = await fetch('/api/chat', { // Correct API route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }

            const data = await res.json();
            console.log('Ollama response:', data); // Log the response from Ollama
            return data.reply; // Adjust based on the structure of the response
        } catch (error) {
            console.error('Error fetching Ollama response:', error);
            return null;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-lg w-96 h-[500px] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Chat</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <span className="bg-blue-600 rounded px-2 py-1">{msg}</span>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-700 flex">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown} // Added event handler
                        className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-l px-2 py-1"
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

export default ChatModal;
