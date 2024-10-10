'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EthereumProvider {
  isMetaMask?: boolean;
  isRabby?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    rabby?: EthereumProvider;
  }
}

const Web3SignIn: React.FC = () => {
  const { user } = useUser();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const checkAvailableWallets = () => {
      const wallets = [];
      if (window.ethereum?.isMetaMask) wallets.push('MetaMask');
      if (window.ethereum?.isRabby || window.rabby) wallets.push('Rabby');
      setAvailableWallets(wallets);
    };

    checkAvailableWallets();
  }, []);

  const getProvider = (type: string): EthereumProvider | null => {
    if (type === 'MetaMask' && window.ethereum?.isMetaMask) {
      return window.ethereum;
    } else if (type === 'Rabby' && (window.ethereum?.isRabby || window.rabby)) {
      return window.rabby || window.ethereum;
    }
    return null;
  };

  const connectWallet = async (type: string) => {
    setIsConnecting(true);
    const provider = getProvider(type);
    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        if (accounts[0]) {
          const message = `Sign this message to confirm you own this wallet and connect it to Quantum Labs.\n\nWallet address: ${accounts[0]}\nTimestamp: ${Date.now()}`;
          
          const signature = await provider.request({
            method: 'personal_sign',
            params: [message, accounts[0], 'Quantum Labs Authentication'],
          });

          if (signature) {
            setWalletAddress(accounts[0]);
            setWalletType(type);
            toast.success(`${type} connected and verified: ${accounts[0]}`);
          } else {
            throw new Error('Signature request was cancelled');
          }
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        toast.error(`Failed to connect ${type}: ${(error as Error).message}`);
      } finally {
        setIsConnecting(false);
      }
    } else {
      toast.error(`${type} is not installed or available`);
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletType(null);
    toast.success('Wallet disconnected');
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="flex items-center bg-gray-700 text-white hover:bg-gray-600">
            {walletAddress ? (
              <>
                <span className="mr-2">{walletType}:</span>
                <span>{truncateAddress(walletAddress)}</span>
              </>
            ) : (
              'Connect Wallet'
            )}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </DropdownMenu.Trigger>
      <AnimatePresence>
        <DropdownMenu.Content forceMount className="bg-gray-800 rounded-md shadow-lg p-2 mt-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {!walletAddress ? (
              <>
                {availableWallets.map((wallet) => (
                  <DropdownMenu.Item 
                    key={wallet}
                    className="cursor-pointer p-2 hover:bg-gray-700 text-white" 
                    onSelect={() => connectWallet(wallet)}
                  >
                    <motion.div whileHover={{ x: 5 }} className="flex items-center">
                      {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Connect {wallet}
                    </motion.div>
                  </DropdownMenu.Item>
                ))}
                {availableWallets.length === 0 && (
                  <DropdownMenu.Item className="p-2 text-gray-400">
                    No supported wallets found
                  </DropdownMenu.Item>
                )}
              </>
            ) : (
              <DropdownMenu.Item className="cursor-pointer p-2 hover:bg-gray-700 text-white" onSelect={disconnectWallet}>
                <motion.div whileHover={{ x: 5 }}>
                  Disconnect Wallet
                </motion.div>
              </DropdownMenu.Item>
            )}
          </motion.div>
        </DropdownMenu.Content>
      </AnimatePresence>
    </DropdownMenu.Root>
  );
};

export default Web3SignIn;