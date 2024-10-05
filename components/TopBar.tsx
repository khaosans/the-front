'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell as BellIcon, Settings as SettingsIcon, MessageCircle as MessageCircleIcon, BarChart2 as BarChart2Icon } from 'lucide-react';
import ChatModal from './ChatModal';

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
                    <Link href="/" passHref>
                        <span className="text-white hover:underline cursor-pointer">Home</span>
                    </Link>
                    <Link href="/ai-agents" passHref>
                        <span className="text-white hover:underline cursor-pointer">AI Agents</span>
                    </Link>
                    <Link href="/tasks" passHref>
                        <span className="text-white hover:underline cursor-pointer">Tasks</span>
                    </Link>
                    <Link href="/analytics" passHref>
                        <span className="text-white hover:underline flex items-center cursor-pointer">
                            <BarChart2Icon className="h-5 w-5 mr-1" /> Analytics
                        </span>
                    </Link>
                    <Link href="/settings" passHref>
                        <span className="text-white hover:underline flex items-center cursor-pointer">
                            <SettingsIcon className="h-5 w-5 mr-1" /> Settings
                        </span>
                    </Link>
                    <Link href="/notifications" passHref>
                        <span className="text-white hover:underline flex items-center cursor-pointer">
                            <BellIcon className="h-5 w-5 mr-1" /> Notifications
                        </span>
                    </Link>
                    <button onClick={toggleChat} className="text-white hover:underline flex items-center">
                        <MessageCircleIcon className="h-5 w-5 mr-1" /> Chat
                    </button>
                </nav>
            </div>
            <ChatModal isOpen={isChatOpen} onClose={toggleChat} />
        </>
    );
};

export default TopBar;
