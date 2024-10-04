'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, Home, MessageCircle, LogOut } from 'lucide-react'; // Import the necessary icons
import { supabase } from '@/utils/supabase/client';
import { useTheme } from '@/contexts/ThemeContext';
import ChatBotModal from './ChatBotModal'; // Ensure this path is correct

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
        setIsChatOpen((prev) => !prev);
    };

    return (
        <div className="top-bar">
            <button onClick={toggleChat} className="chat-icon">
                Chat
            </button>
            <ChatBotModal isOpen={isChatOpen} onClose={toggleChat} />
        </div>
    );
}

export default TopBar;