'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@geist-ui/react';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Wallet } from 'lucide-react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers'; // Correct import

// Mock data for Ethereum
const ethTokens = [
  { name: 'Ethereum', symbol: 'ETH', balance: 2.5, value: 5000, change: 3.5 },
  { name: 'USD Coin', symbol: 'USDC', balance: 1000, value: 1000, change: 0 },
  { name: 'Aave', symbol: 'AAVE', balance: 10, value: 800, change: -2.1 },
  { name: 'Uniswap', symbol: 'UNI', balance: 50, value: 300, change: 1.2 },
];

// Mock data for Solana
const solTokens = [
  { name: 'Solana', symbol: 'SOL', balance: 50, value: 3000, change: 5.2 },
  { name: 'Serum', symbol: 'SRM', balance: 500, value: 750, change: -1.8 },
  { name: 'Raydium', symbol: 'RAY', balance: 100, value: 400, change: 2.3 },
];

const protocols = [
  { name: 'Aave', tvl: 1200, apy: 3.2 },
  { name: 'Compound', tvl: 800, apy: 2.8 },
  { name: 'Uniswap', tvl: 500, apy: 0 },
];

const transactions = [
  { type: 'Swap', description: 'ETH to USDC', amount: '0.5 ETH', timestamp: '2023-05-01 14:30' },
  { type: 'Deposit', description: 'Aave', amount: '100 USDC', timestamp: '2023-04-30 09:15' },
  { type: 'Withdraw', description: 'Compound', amount: '0.2 ETH', timestamp: '2023-04-29 18:45' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42], // Mainnet, Ropsten, Rinkeby, Goerli, Kovan
});

export default function DefiWalletPage() {
  const { activate, deactivate, account, active } = useWeb3React<Web3Provider>();
  const [activeChain, setActiveChain] = useState('ethereum');
  const [loading, setLoading] = useState(false);

  const tokens = activeChain === 'ethereum' ? ethTokens : solTokens;
  const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);

  const pieData = tokens.map(token => ({
    name: token.symbol,
    value: token.value
  }));

  const connectWallet = async () => {
    setLoading(true);
    try {
      await activate(injected);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    deactivate();
  };

  return (
    <div className="container mx-auto py-8 text-white bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">DeFi Wallet</h1>
        {active ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{account}</span>
            <Button auto scale={2/3} onClick={disconnectWallet}>Disconnect</Button>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button auto scale={2/3} onClick={connectWallet} disabled={loading}>
                <Wallet className="mr-2 h-4 w-4" /> {loading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Connect your wallet</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Choose a wallet to connect to this dapp:
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button auto scale={1} className="justify-start bg-gray-700 hover:bg-gray-600" onClick={connectWallet} disabled={loading}>
                  Rabby Wallet
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {active ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gray-800 text-white">
              <CardHeader>
                <CardTitle>Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">${totalValue.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2 bg-gray-800 text-white">
              <CardHeader>
                <CardTitle>Portfolio Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-gray-800 text-white">
              <CardHeader>
                <CardTitle>Token Balances</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {tokens.map((token, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{token.name}</p>
                        <p className="text-sm text-gray-400">{token.balance} {token.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${token.value.toLocaleString()}</p>
                        <p className={`text-sm ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {token.change >= 0 ? <ArrowUpRight className="inline w-4 h-4" /> : <ArrowDownRight className="inline w-4 h-4" />}
                          {Math.abs(token.change)}%
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 text-white">
              <CardHeader>
                <CardTitle>Protocol Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {protocols.map((protocol, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{protocol.name}</p>
                        <p className="text-sm text-gray-400">TVL: ${protocol.tvl.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{protocol.apy}% APY</p>
                        <Button auto scale={1/3} className="bg-gray-700 hover:bg-gray-600">
                          Interact <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {transactions.map((tx, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{tx.type}</p>
                      <p className="text-sm text-gray-400">{tx.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{tx.amount}</p>
                      <p className="text-sm text-gray-400">{tx.timestamp}</p>
                    </div>
                    <Button auto scale={1/3} className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="bg-gray-800 text-white">
          <CardContent className="flex flex-col items-center justify-center h-[60vh]">
            <Wallet className="w-16 h-16 mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-4">Connect your wallet to view your DeFi portfolio</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button auto scale={1} className="justify-start bg-gray-700 hover:bg-gray-600" onClick={connectWallet} disabled={loading}>
                  <Wallet className="mr-2 h-4 w-4" /> {loading ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Connect your wallet</DialogTitle>
                  <DialogDescription>
                    Choose a wallet to connect to this dapp:
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button auto scale={1} className="justify-start bg-gray-700 hover:bg-gray-600" onClick={connectWallet} disabled={loading}>
                    Rabby Wallet
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}