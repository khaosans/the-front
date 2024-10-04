'use client';

import React, { useEffect, useState } from 'react';
import { Message } from '@/types'; // Adjust the import based on your types definition

interface ChatHistoryProps {
    chatId: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatId }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const loadChatHistory = () => {
            const savedMessages = window.localStorage.getItem(`chat_${chatId}`);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        };

        loadChatHistory();
    }, [chatId]);

    return (
        <div className="chat-history">
            <h2>Chat History</h2>
            <div className="messages">
                {messages.length === 0 ? (
                    <p>No messages found.</p>
                ) : (
                    messages.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            <span className={`message-content ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                {message.content}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatHistory;