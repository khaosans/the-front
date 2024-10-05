'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, AlertCircle, Copy, CheckCircle, ArrowDown, Plus, MessageSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigation } from '@/utils/navigation';
import { nanoid } from 'nanoid';

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

interface ChatSession {
    id: string;
    name: string;
    messages: Message[];
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [availableModels, setAvailableModels] = useState<OllamaModel[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigation = useNavigation();
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string>('');

    useEffect(() => {
        fetchAvailableModels();
        loadChatSessions();
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

    const loadChatSessions = () => {
        const storedSessions = localStorage.getItem('chat_sessions');
        if (storedSessions) {
            const sessions = JSON.parse(storedSessions);
            setChatSessions(sessions);
            if (sessions.length > 0) {
                setCurrentChatId(sessions[0].id);
                setMessages(sessions[0].messages);
            } else {
                startNewChat();
            }
        } else {
            startNewChat();
        }
    };

    const saveChatSessions = () => {
        localStorage.setItem('chat_sessions', JSON.stringify(chatSessions));
    };

    useEffect(() => {
        saveChatSessions();
    }, [chatSessions]);

    const startNewChat = () => {
        const newChatId = nanoid();
        const newSession: ChatSession = {
            id: newChatId,
            name: `Chat ${chatSessions.length + 1}`,
            messages: []
        };
        setChatSessions(prev => [newSession, ...prev]);
        setCurrentChatId(newChatId);
        setMessages([]);
    };

    const updateCurrentChat = (messages: Message[]) => {
        setChatSessions(prev => prev.map(session => 
            session.id === currentChatId ? { ...session, messages } : session
        ));
    };

    useEffect(() => {
        updateCurrentChat(messages);
    }, [messages]);

    const switchChat = (chatId: string) => {
        const selectedChat = chatSessions.find(session => session.id === chatId);
        if (selectedChat) {
            setCurrentChatId(chatId);
            setMessages(selectedChat.messages);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            const handleScroll = () => {
                const { scrollTop, scrollHeight, clientHeight } = chatContainer;
                const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
                setShowScrollButton(!isScrolledToBottom);
            };

            chatContainer.addEventListener('scroll', handleScroll);
            return () => chatContainer.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (!showScrollButton) {
            scrollToBottom();
        }
    }, [messages, showScrollButton]);

    const formatMessage = (text: string): React.ReactNode => {
        const lines = text.split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('```')) {
                // Code block
                return (
                    <pre key={index} className="bg-gray-100 p-2 rounded my-2 overflow-x-auto">
                        <code>{line.slice(3)}</code>
                    </pre>
                );
            } else if (line.startsWith('#')) {
                // Heading
                const level = line.match(/^#+/)[0].length;
                const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
                return <HeadingTag key={index} className="font-bold my-2">{line.slice(level + 1)}</HeadingTag>;
            } else if (line.startsWith('- ')) {
                // Unordered list item
                return <li key={index} className="ml-4">• {line.slice(2)}</li>;
            } else if (line.match(/^\d+\. /)) {
                // Ordered list item
                return <li key={index} className="ml-4 list-decimal">{line.slice(line.indexOf(' ') + 1)}</li>;
            } else {
                // Regular text
                return <p key={index} className="my-1">{line}</p>;
            }
        });
    };

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

                let botMessage = '';

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

    const copyToClipboard = (text: string, messageId: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-1/2 h-[600px] flex flex-col relative">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Chat</h2>
                    <div className="flex items-center space-x-2">
                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {availableModels.map((model) => (
                                    <SelectItem key={model.name} value={model.name}>
                                        {model.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={currentChatId} onValueChange={switchChat}>
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Select chat" />
                            </SelectTrigger>
                            <SelectContent className="bg-white max-h-[200px] overflow-y-auto">
                                {chatSessions.map((session) => (
                                    <SelectItem key={session.id} value={session.id}>
                                        <div className="flex items-center">
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            {session.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <button
                            onClick={startNewChat}
                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                            title="New Chat"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 relative">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`mb-4 ${msg.isBot ? 'text-left' : 'text-right'} relative`}>
                            <div className={`inline-block px-4 py-2 rounded-lg ${
                                msg.isBot 
                                    ? msg.isError 
                                        ? 'bg-red-100 text-red-800' 
                                        : 'bg-gray-100' 
                                    : 'bg-blue-100 text-blue-800'
                            } max-w-[80%]`}>
                                {msg.isError && <AlertCircle className="inline-block mr-1 h-4 w-4 text-red-500" />}
                                {formatMessage(msg.text)}
                                {msg.isBot && !msg.isError && (
                                    <button 
                                        onClick={() => copyToClipboard(msg.text, msg.id)}
                                        className="ml-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                                        title="Copy message"
                                    >
                                        {copiedMessageId === msg.id ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-gray-500" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="text-center text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin inline-block" />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                    {showScrollButton && (
                        <button
                            onClick={scrollToBottom}
                            className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
                            title="Scroll to bottom"
                        >
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    )}
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