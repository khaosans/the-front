'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, Home, MessageCircle, LogOut } from 'lucide-react'; // Import the necessary icons
import { supabase } from '@/utils/supabase/client';
import ChatModal from './ChatModal'; // Import the ChatModal component

const TopBar: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Sign out from Supabase
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
                return;
            }

            // Clear any local storage
            localStorage.clear();

            // Clear any session cookies
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });

            // Redirect to the landing page
            router.push('/landing');
        } catch (error) {
            console.error('Unexpected error during logout:', error);
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
                <h1 className="text-2xl font-bold">Quantum Labs</h1>
                <nav className="flex space-x-4">
                    <Link href="/" className="hover:underline flex items-center">
                        <Home className="h-5 w-5 mr-1" /> {/* Home icon */}
                        Home
                    </Link>

                    <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                    <Link href="/members" className="hover:underline">Members</Link>
                    <Link href="/task-design" className="hover:underline">Tasks Design</Link>

                </nav>
                <div className="flex items-center space-x-4">
                    <button className="hover:bg-gray-700 p-2 rounded" onClick={toggleChat}>
                        <MessageCircle className="h-5 w-5" /> {/* Chat icon */}
                    </button>
                    <Link href="/settings" className="hover:bg-gray-700 p-2 rounded flex items-center">
                        <Settings className="h-5 w-5" /> {/* Gear icon */}
                    </Link>
                    <Link href="/notifications" className="hover:bg-gray-700 p-2 rounded">
                        <Bell className="h-5 w-5" /> {/* Bell icon */}
                    </Link>
                    <button className="hover:bg-gray-700 p-2 rounded" onClick={handleLogout}>
                        <LogOut className="h-5 w-5" /> {/* Logout icon */}
                    </button>
                </div>
            </header>
            {isChatOpen && <ChatModal onClose={toggleChat} />}
        </>
    );
}

export default TopBar;