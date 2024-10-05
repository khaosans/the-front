'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigation } from '@/utils/navigation';

interface ChatModalProps {
    onClose: () => void;
}

interface Message {
    id: string;
    text: string;
    isBot: boolean;
    isError: boolean;
}

interface OllamaModel {
    name: string;
    modified_at: string;
    size: number;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [availableModels, setAvailableModels] = useState<OllamaModel[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchAvailableModels();
    }, []);

    const fetchAvailableModels = async () => {
        try {
            const response = await fetch('http://localhost:11434/api/tags');
            const data = await response.json();
            setAvailableModels(data.models);
            if (data.models.length > 0) {
                setSelectedModel(data.models[0].name);
            }
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() && selectedModel) {
            const userMessage: Message = { id: Date.now().toString(), text: inputMessage, isBot: false, isError: false };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setInputMessage('');
            setIsLoading(true);

            const newMessageId = `bot-${Date.now()}`;
            setMessages(prevMessages => [...prevMessages, { id: newMessageId, text: '', isBot: true, isError: false }]);

            try {
                const response = await fetch('http://localhost:11434/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: selectedModel,
                        messages: [{ role: "user", content: inputMessage }],
                        stream: true,
                    }),
                });

                const reader = response.body?.getReader();
                const decoder = new TextDecoder('utf-8');

                let botMessage = ''; // Move this declaration outside the if block

                if (reader) {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        const chunk = decoder.decode(value, { stream: true });
                        try {
                            const parsedChunk = JSON.parse(chunk);
                            if (parsedChunk.done) break;
                            botMessage += parsedChunk.message.content;
                            setMessages(prevMessages => {
                                const updatedMessages = [...prevMessages];
                                const botMessageIndex = updatedMessages.findIndex(msg => msg.id === newMessageId);
                                if (botMessageIndex !== -1) {
                                    updatedMessages[botMessageIndex].text = botMessage;
                                }
                                return updatedMessages;
                            });
                        } catch (e) {
                            console.error('Error parsing chunk:', e);
                        }
                    }
                }

                // Check for navigation commands in the bot's response
                const navigationCommands = {
                    "go to home": navigation.goToHome,
                    "go to tasks": navigation.goToTasks,
                    "go to ai agents": navigation.goToAIAgents,
                    "go to analytics": navigation.goToAnalytics,
                    "go to settings": navigation.goToSettings,
                    "go to notifications": navigation.goToNotifications,
                };

                Object.entries(navigationCommands).forEach(([command, action]) => {
                    if (botMessage.toLowerCase().includes(command)) {
                        action();
                    }
                });

            } catch (error) {
                console.error('Error sending message:', error);
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    const botMessageIndex = updatedMessages.findIndex(msg => msg.id === newMessageId);
                    if (botMessageIndex !== -1) {
                        updatedMessages[botMessageIndex] = {
                            id: newMessageId,
                            text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
                            isBot: true,
                            isError: true
                        };
                    }
                    return updatedMessages;
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-1/2 h-[600px] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Chat</h2>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableModels.map((model) => (
                                <SelectItem key={model.name} value={model.name}>
                                    {model.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`mb-2 ${msg.isBot ? 'text-left' : 'text-right'}`}>
                            <span className={`inline-block px-2 py-1 rounded ${
                                msg.isBot 
                                    ? msg.isError 
                                        ? 'bg-red-100 text-red-800' 
                                        : 'bg-gray-100' 
                                    : 'bg-gray-200'
                            }`}>
                                {msg.isError && <AlertCircle className="inline-block mr-1 h-4 w-4 text-red-500" />}
                                {msg.text}
                            </span>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="text-center text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin inline-block" />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t flex">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border rounded-l px-2 py-1"
                        placeholder="Type a message..."
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white px-4 py-1 rounded-r flex items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;