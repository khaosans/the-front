import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from 'ethers';

interface ExtendedProvider extends ethers.providers.ExternalProvider {
  isMetaMask?: boolean;
  isRabby?: boolean;
}

declare global {
  interface Window {
    ethereum?: ExtendedProvider;
    rabby?: ExtendedProvider;
  }
}

declare module '@web3-react/injected-connector';
declare module '@geist-ui/react';
declare module 'recharts';
declare module '@supabase/auth-helpers-nextjs';
declare module 'lucide-react';
declare module '@web3-react/walletconnect-connector';
declare module '@ethersproject/providers';