'use client';

import React from 'react';
import Link from 'next/link';
import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { BarChart2, CheckSquare } from 'lucide-react';
import TopBar from '@/components/TopBar';
import { useWallet } from '@/contexts/WalletContext';
import ProductCard from '@/components/ProductCard'; // Import the new ProductCard

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const { wallet, setWallet } = useWallet();

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const handleWalletChange = (newWallet: { address: string; type: string } | null) => {
    setWallet(newWallet);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TopBar 
        onWalletChange={handleWalletChange}
        selectedWallet={wallet}
        productName="Quantum Labs"
        productLinks={[
          { href: "/", label: "Home" },
          { href: "/defi-dashboard", label: "DeFi Dashboard" },
          { href: "/task-flow", label: "Task-Flow" },
          { href: "/portfolio", label: "Portfolio" }, // Ensure this is an authenticated route
        ]}
      />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-6">Welcome to Quantum Labs</h1>
        <p className="text-xl text-center mb-12 text-gray-300">Empowering your projects with AI-driven solutions</p>
        
        <SignedIn>
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Product</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ProductCard
              title="DeFi Tracker"
              description="Track your DeFi investments, get AI-powered insights, and stay updated with real-time crypto prices."
              icon={<BarChart2 className="w-12 h-12 mb-4 text-indigo-400" />}
              features={["Portfolio Management", "AI-Driven Analytics", "Live Crypto Charts"]}
              href="/defi-dashboard" // Ensure this is an authenticated route
              color="indigo"
            />
            <ProductCard
              title="Task-Flow"
              description="Streamline your workflow, collaborate with your team, and boost productivity with AI-powered task management."
              icon={<CheckSquare className="w-12 h-12 mb-4 text-emerald-400" />}
              features={["Intuitive Task Organization", "Team Collaboration Tools", "AI-Assisted Prioritization"]}
              href="/task-flow" // Ensure this is an authenticated route
              color="emerald"
            />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex flex-col items-center justify-center space-y-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="w-48">Sign Up</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline" className="w-48">Sign In</Button>
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}