import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

declare module '@web3-react/injected-connector';
declare module '@geist-ui/react';
declare module 'recharts';