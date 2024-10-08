'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, Home, MessageCircle, LogOut } from 'lucide-react';
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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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

  const connectWallet = async () => {
    if (isConnecting) return; // Prevent multiple requests
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        await activate(injected);
        toast.success('Wallet connected successfully');
      } else {
        toast.error('Please install MetaMask or Rabby');
      }
    } catch (error: any) {
      if (error.code === -32002) {
        toast.error('Connection request already in progress. Please check your wallet.');
      } else {
        console.error("Error connecting wallet:", error.message);
        toast.error(error.message || "Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

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
        <h1 className="text-2xl font-bold">Quantum Labs</h1>
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
            <CustomButton onClick={connectWallet} className="bg-blue-500 hover:bg-blue-600" disabled={isConnecting}>
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </CustomButton>
          )}
          {isConnecting && <span className="text-white">Connecting to wallet...</span>}
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
    </>
  );
}

export default TopBar;