'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Use Next.js Link
import { Bell, Settings, MessageCircle, BarChart2 } from 'lucide-react';
import ChatModal from './ChatModal'; // Import the ChatModal component

const TopBar: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-lg font-bold">Task Manager</h1>
                <nav className="space-x-4 flex items-center">
                    <Link href="/" className="text-white hover:underline">
                        Home
                    </Link>
                    <Link href="/ai-agents" className="text-white hover:underline">
                        AI Agents
                    </Link>
                    <Link href="/tasks" className="text-white hover:underline">
                        Tasksfix 
                    </Link>
                    <Link href="/analytics" className="text-white hover:underline flex items-center">
                        <BarChart2 className="h-5 w-5 mr-1" /> Analytics
                    </Link>
                    <Link href="/settings" className="text-white hover:underline flex items-center">
                        <Settings className="h-5 w-5 mr-1" />
                    </Link>
                    <Link href="/notifications" className="text-white hover:underline flex items-center">
                        <Bell className="h-5 w-5 mr-1" />
                    </Link>
                    <button onClick={toggleChat} className="text-white hover:underline flex items-center">
                        <MessageCircle className="h-5 w-5 mr-1" /> Chat
                    </button>
                </nav>
            </div>
            {isChatOpen && <ChatModal onClose={toggleChat} />}
        </>
    );
};

export default TopBar;