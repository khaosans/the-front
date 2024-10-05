'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X as XIcon, Send as SendIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface OllamaModel {
    name: string;
    size: string;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [models, setModels] = useState<OllamaModel[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        fetchOllamaModels();
    }, []);

    const fetchOllamaModels = async () => {
        try {
            const response = await fetch('http://localhost:11434/api/tags');
            if (!response.ok) {
                throw new Error('Failed to fetch Ollama models');
            }
            const data = await response.json();
            setModels(data.models);
            if (data.models.length > 0) {
                setSelectedModel(data.models[0].name);
            }
        } catch (error) {
            console.error('Error fetching Ollama models:', error);
        }
    };

    const handleSend = async () => {
        if (input.trim() === '' || !selectedModel) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    model: selectedModel,
                    prompt: input,
                    stream: true
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from Ollama');
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantMessage: Message = { role: 'assistant', content: '' };

            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim() !== '');
                for (const line of lines) {
                    const json = JSON.parse(line);
                    if (json.response) {
                        assistantMessage.content += json.response;
                        setMessages(prev => [...prev.slice(0, -1), assistantMessage]);
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="modal w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col h-3/4">
                <div className="modal-header flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Chat with AI</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <XIcon size={24} />
                    </button>
                </div>
                <div className="p-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                            className="w-full text-left bg-gray-100 p-2 rounded flex justify-between items-center"
                        >
                            {selectedModel || 'Select a model'}
                            <ChevronDownIcon size={20} />
                        </button>
                        {isModelDropdownOpen && (
                            <div className="absolute z-10 w-full bg-white border rounded mt-1">
                                {models.map((model) => (
                                    <button
                                        key={model.name}
                                        onClick={() => {
                                            setSelectedModel(model.name);
                                            setIsModelDropdownOpen(false);
                                        }}
                                        className="block w-full text-left p-2 hover:bg-gray-100"
                                    >
                                        {model.name} ({model.size})
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="modal-body p-4 flex-grow overflow-y-auto">
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                {message.content}
                            </span>
                        </div>
                    ))}
                    {isLoading && <div className="text-center">AI is thinking...</div>}
                    <div ref={messagesEndRef} />
                </div>
                <div className="modal-footer p-4 border-t">
                    <div className="flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-grow mr-2 p-2 border rounded"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            disabled={isLoading || !selectedModel}
                        >
                            <SendIcon size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;