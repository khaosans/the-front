'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import supabase from '../utils/supabase'; // Adjust the import based on your file structure

interface ChatModalProps {
    onClose: () => void;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [models, setModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        try {
            const response = await fetch('/api/tags');
            if (!response.ok) {
                throw new Error('Failed to fetch models');
            }
            const data = await response.json();
            setModels(data.models);
            if (data.models.length > 0) {
                setSelectedModel(data.models[0]);
            }
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() && !loading) {
            setLoading(true);
            const userMessage: Message = { role: 'user', content: inputMessage };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setInputMessage('');

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: inputMessage, model: selectedModel }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch response');
                }

                const reader = response.body?.getReader();
                let assistantMessage = '';

                while (true) {
                    const { done, value } = await reader!.read();
                    if (done) break;
                    const chunk = new TextDecoder().decode(value);
                    assistantMessage += chunk;
                    setMessages(prevMessages => [
                        ...prevMessages.slice(0, -1),
                        { role: 'assistant', content: assistantMessage }
                    ]);
                }

                // Save messages to Supabase
                await supabase.from('messages').insert([
                    { content: inputMessage, role: 'user' },
                    { content: assistantMessage, role: 'assistant' }
                ]);

            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
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
                        <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <span className={`inline-block rounded px-2 py-1 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                                {msg.content}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-700">
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full mb-2 bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                    >
                        {models.map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                    <div className="flex">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-l px-2 py-1"
                            placeholder="Type a message..."
                            disabled={loading}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-1 rounded-r"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;