'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, Home, MessageCircle, LogOut, Wallet } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ChatbotModal from './ChatbotModal';
import { User } from '@supabase/supabase-js';
import { CustomButton } from './CustomButton';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

const TopBar: React.FC = () => {
  const { account, activate, active, deactivate } = useWeb3React();
  const [user, setUser] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [ethBalance, setEthBalance] = useState<string>('0');
  const router = useRouter();
  const [logoText] = useState('Quantum Labs');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, [supabase.auth]);

  useEffect(() => {
    if (active && account) {
      fetchEthBalance();
    }
  }, [active, account]);

  const fetchEthBalance = async () => {
    if (active && account) {
      try {
        const provider = new ethers.providers.InfuraProvider('mainnet', process.env.NEXT_PUBLIC_INFURA_API_KEY);
        const balance = await provider.getBalance(account);
        setEthBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Error fetching ETH balance:", error);
        toast.error("Failed to fetch ETH balance");
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (active) {
      await deactivate();
    }
    router.push('/login');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const connectWallet = useCallback(async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    try {
      await activate(injected);
      toast.success('Wallet connected successfully');
    } catch (error: any) {
      console.error("Error connecting to wallet:", error.message);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  }, [activate, isConnecting]);

  const disconnectWallet = async () => {
    try {
      deactivate();
      setEthBalance('0');
      toast.success('Wallet disconnected successfully');
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error('Failed to disconnect wallet');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold glow-effect">{logoText}</h1>
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
          {active ? (
            <>
              <span>{`${account?.slice(0, 6)}...${account?.slice(-4)}`}</span>
              <span>{parseFloat(ethBalance).toFixed(4)} ETH</span>
              <CustomButton onClick={disconnectWallet} className="bg-red-500 hover:bg-red-600">
                Disconnect
              </CustomButton>
            </>
          ) : (
            <CustomButton onClick={connectWallet} disabled={isConnecting} className="bg-blue-500 hover:bg-blue-600">
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </CustomButton>
          )}
          <button className="hover:bg-gray-700 p-2 rounded" onClick={toggleChat}>
            <MessageCircle className="h-5 w-5" />
          </button>
          <Link href="/settings" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <Settings className="h-5 w-5" />
          </Link>
          <Link href="/notifications" className="hover:bg-gray-700 p-2 rounded">
            <Bell className="h-5 w-5" />
          </Link>
          {user && (
            <button className="hover:bg-gray-700 p-2 rounded" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </header>
      {isChatOpen && <ChatbotModal onClose={() => setIsChatOpen(false)} />}
      <style jsx>{`
        .glow-effect {
          text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
          transition: text-shadow 0.3s;
        }
        .glow-effect:hover {
          text-shadow: 0 0 10px #ffffff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;
        }
      `}</style>
    </>
  );
}

export default TopBar;