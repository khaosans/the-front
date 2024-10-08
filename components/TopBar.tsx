'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, Home, MessageCircle, LogOut } from 'lucide-react'; // Updated icon import
import { supabase } from '@/utils/supabase/client';
import ChatbotModal from './ChatbotModal'; // Updated import to use ChatbotModal

const TopBar: React.FC = () => {
    const [user, setUser] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
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
                    <Link href="/task-manager" className="hover:underline">Task Manager</Link>
                    <Link href="/agent-manager" className="hover:underline">Agent Manager</Link> {/* Added link to Agent Manager */}
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
            {isChatOpen && <ChatbotModal onClose={() => setIsChatOpen(false)} />} {/* Render ChatbotModal */}
        </>
    );
}

export default TopBar;
