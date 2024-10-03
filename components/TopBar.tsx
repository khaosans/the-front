'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Settings, Home, MessageCircle, LogOut } from 'lucide-react'; // Import the necessary icons
import { supabase } from '@/utils/supabase/client';

const TopBar: React.FC<{ onChatOpen: () => void }> = ({ onChatOpen }) => {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            // Clear session cookie if necessary
            document.cookie = 'supabaseSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // Redirect to the landing page after logout
            window.location.href = '/'; // Assuming '/' is your landing page
        }
    };

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">Quantum Labs</h1>
            <nav className="flex space-x-4">
                <Link href="/" className="hover:underline flex items-center">
                    <Home className="h-5 w-5 mr-1" /> {/* Home icon */}
                    Home
                </Link>

                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/members" className="hover:underline">Members</Link>
                <Link href="/task-agent-analytics" className="hover:underline">Task Agent Analytics</Link>
            </nav>
            <div className="flex items-center space-x-4">
                <button className="hover:bg-gray-700 p-2 rounded" onClick={onChatOpen}>
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
    );
};

export default TopBar;