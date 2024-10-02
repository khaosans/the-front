'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Settings, Home, MessageCircle } from 'lucide-react'; // Import the necessary icons

const TopBar: React.FC<{ onChatOpen: () => void }> = ({ onChatOpen }) => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">Quantum Labs</h1>
            <nav className="flex space-x-4">
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/taskboard" className="hover:underline">Taskboard</Link>
                <Link href="/members" className="hover:underline">Members</Link>
                <Link href="/analytics" className="hover:underline">Analytics</Link>
                <Link href="/" className="hover:underline flex items-center">
                    <Home className="h-5 w-5 mr-1" /> {/* Home icon */}
                    Home
                </Link>
            </nav>
            <div className="flex items-center space-x-4">
                <button className="hover:bg-gray-700 p-2 rounded" onClick={onChatOpen}>
                    <MessageCircle className="h-5 w-5" /> {/* Chat icon */}
                </button>
                <Link href="/settings" className="hover:bg-gray-700 p-2 rounded flex items-center">
                    <Settings className="h-5 w-5" /> {/* Gear icon */}
                </Link>
                <button className="hover:bg-gray-700 p-2 rounded">
                    <Bell className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
};

export default TopBar;