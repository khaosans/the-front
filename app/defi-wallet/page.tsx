'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Wallet, ExternalLink } from 'lucide-react';

// Mock data
const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '🔷' },
    { id: 'solana', name: 'Solana', icon: '☀️' },
]

const tokenData = {
    ethereum: [
        { name: 'Ethereum', symbol: 'ETH', balance: 2.5, value: 5000, change: 3.5, history: [3800, 4000, 4200, 3900, 4100, 4300, 5000] },
        { name: 'USD Coin', symbol: 'USDC', balance: 1000, value: 1000, change: 0, history: [1000, 1000, 1000, 1000, 1000, 1000, 1000] },
        { name: 'Aave', symbol: 'AAVE', balance: 10, value: 800, change: -2.1, history: [900, 850, 820, 780, 810, 790, 800] },
        { name: 'Uniswap', symbol: 'UNI', balance: 50, value: 300, change: 1.2, history: [280, 290, 285, 295, 300, 305, 300] },
    ],
    solana: [
        { name: 'Solana', symbol: 'SOL', balance: 50, value: 3000, change: 5.2, history: [2500, 2600, 2700, 2800, 2900, 3100, 3000] },
        { name: 'Serum', symbol: 'SRM', balance: 500, value: 750, change: -1.8, history: [800, 780, 760, 740, 730, 745, 750] },
        { name: 'Raydium', symbol: 'RAY', balance: 100, value: 400, change: 2.3, history: [380, 385, 390, 395, 405, 410, 400] },
    ],
}

const protocols = [
    { name: 'Aave', tvl: 1200, apy: 3.2 },
    { name: 'Compound', tvl: 800, apy: 2.8 },
    { name: 'Uniswap', tvl: 500, apy: 0 },
]

const transactions = [
    { type: 'Swap', description: 'ETH to USDC', amount: '0.5 ETH', timestamp: '2023-05-01 14:30' },
    { type: 'Deposit', description: 'Aave', amount: '100 USDC', timestamp: '2023-04-30 09:15' },
    { type: 'Withdraw', description: 'Compound', amount: '0.2 ETH', timestamp: '2023-04-29 18:45' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B8E23']

export default function DefiWalletPage() {
    const [isWalletConnected, setIsWalletConnected] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')
    const [activeChain, setActiveChain] = useState('ethereum')
    const tokens = tokenData[activeChain as keyof typeof tokenData]
    const totalValue = tokens.reduce((sum: any, token: any) => sum + token.value, 0)
    const pieData = tokens.map((token: any) => ({ name: token.symbol, value: token.value }))

    const connectWallet = async () => {
        // Simulating wallet connection
        setTimeout(() => {
            setIsWalletConnected(true)
            setWalletAddress('0x1234...5678') // Example shortened address
        }, 1000)
    }

    const disconnectWallet = () => {
        setIsWalletConnected(false)
        setWalletAddress('')
    }

    return (
        <div className="container mx-auto py-8 text-white bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">DeFi Wallet</h1>
                {isWalletConnected ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{walletAddress}</span>
                        <Button variant="outline" onClick={disconnectWallet}>Disconnect</Button>
                    </div>
                ) : (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-800 text-white">
                            <DialogHeader>
                                <DialogTitle>Connect your wallet</DialogTitle>
                                <DialogDescription className="text-gray-400"> Choose a wallet to connect to this dapp: </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Button onClick={connectWallet} className="justify-start bg-gray-700 hover:bg-gray-600">
                                    <img src="/placeholder.svg?height=24&width=24" alt="Rabby" className="mr-2 h-6 w-6" /> Rabby Wallet
                                </Button>
                                {/* Add more wallet options here */}
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
            {isWalletConnected ? (
                <>
                    <Tabs defaultValue="ethereum" className="mb-6">
                        <TabsList className="bg-gray-800">
                            {chains.map((chain) => (
                                <TabsTrigger key={chain.id} value={chain.id} onClick={() => setActiveChain(chain.id)} className="data-[state=active]:bg-gray-700">
                                    {chain.icon} {chain.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {chains.map((chain) => (
                            <TabsContent key={chain.id} value={chain.id}>
                                <h2 className="text-xl font-semibold mb-4">{chain.name} Network</h2>
                            </TabsContent>
                        ))}
                    </Tabs>
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
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                            {pieData.map((entry: any, index: any) => (
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
                                    {tokens.map((token: any, index: any) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{token.name}</p>
                                                <p className="text-sm text-gray-400">{token.balance} {token.symbol}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">${token.value.toLocaleString()}</p>
                                                <p className={`text-sm ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {token.change >= 0 ? <ArrowUpRight className="inline w-4 h-4" /> : <ArrowDownRight className="inline w-4 h-4" />} {Math.abs(token.change)}%
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-800 text-white">
                            <CardHeader>
                                <CardTitle>Token Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={200}>
                                    <AreaChart data={tokens[0].history.map((value: any, index: any) => ({ name: index, value }))}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="bg-gray-800 text-white mb-6">
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
                                            <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-gray-600">Interact <ExternalLink className="ml-2 w-4 h-4" /></Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
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
                                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
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
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 text-white">
                                <DialogHeader>
                                    <DialogTitle>Connect your wallet</DialogTitle>
                                    <DialogDescription className="text-gray-400"> Choose a wallet to connect to this dapp: </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <Button onClick={connectWallet} className="justify-start bg-gray-700 hover:bg-gray-600">
                                        <img src="/placeholder.svg?height=24&width=24" alt="Rabby" className="mr-2 h-6 w-6" /> Rabby Wallet
                                    </Button>
                                    {/* Add more wallet options here */}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}