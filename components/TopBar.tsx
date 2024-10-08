'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, Home, MessageCircle, LogOut, Wallet } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import ChatbotModal from './ChatbotModal';
import { User } from '@supabase/supabase-js';
import { Button } from '@geist-ui/react';
import { ethers } from 'ethers'; // Import ethers directly

// Extend the Window interface to include ethereum
declare global {
    interface Window {
        ethereum?: any; // You can specify a more detailed type if needed
    }
}

const TopBar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const router = useRouter();
    const [logoText, setLogoText] = useState('Quantum Labs');

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

    const connectWallet = async () => {
        if (typeof window !== 'undefined' && window.ethereum) { // Check if window is defined
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum); // Use the correct provider
                const accounts = await provider.send("eth_requestAccounts", []);
                setWalletAddress(accounts[0]);
                console.log(`Connected to wallet: ${accounts[0]}`);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert("Please install a web3 wallet like MetaMask or Rabby Wallet.");
        }
    };

    return (
        <>
            <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
                <h1 className="text-2xl font-bold glow-effect">
                    {logoText}
                </h1>
                <nav className="flex space-x-4">
                    <Link href="/" className="hover:underline flex items-center">
                        <Home className="h-5 w-5 mr-1" />
                        Home
                    </Link>
                    <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                    <Link href="/members" className="hover:underline">Members</Link>
                    <Link href="/task-manager" className="hover:underline">Task Manager</Link>
                    <Link href="/agent-manager" className="hover:underline">Agent Manager</Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Button onClick={connectWallet} className="flex items-center" placeholder="Connect Wallet">
                        <Wallet className="mr-1 h-5 w-5" />
                        {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
                    </Button>
                    <button className="hover:bg-gray-700 p-2 rounded" onClick={toggleChat}>
                        <MessageCircle className="h-5 w-5" />
                    </button>
                    <Link href="/settings" className="hover:bg-gray-700 p-2 rounded flex items-center">
                        <Settings className="h-5 w-5" />
                    </Link>
                    <Link href="/notifications" className="hover:bg-gray-700 p-2 rounded">
                        <Bell className="h-5 w-5" />
                    </Link>
                    <button className="hover:bg-gray-700 p-2 rounded" onClick={handleLogout}>
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </header>
            {isChatOpen && <ChatbotModal onClose={() => setIsChatOpen(false)} />}
        </>
    );
}

export default TopBar;

// CSS for glowing effect
<style jsx>{`
    .glow-effect {
        text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
        transition: text-shadow 0.3s;
    }
    .glow-effect:hover {
        text-shadow: 0 0 10px #ffffff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;
    }
`}</style>