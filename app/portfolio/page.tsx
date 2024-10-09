'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PortfolioPage() {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Define walletAddress
  const walletAddress = user?.web3Wallets?.[0]?.web3Wallet; // Adjust this based on your user object structure

  useEffect(() => {
    if (isSignedIn && walletAddress) {
      console.log("Fetching balance for wallet:", walletAddress); // Log wallet address
      const fetchTotalBalance = async () => {
        try {
          const response = await fetch(`/api/optimism/debank?id=${walletAddress}`, {
            method: 'GET',
          });

          console.log("Response Status:", response.status); // Log the response status

          if (!response.ok) {
            const errorData = await response.json(); // Get error details
            console.error("Error Response Data:", errorData); // Log error response data
            throw new Error(`Network response was not ok: ${errorData.error}`);
          }

          const data = await response.json();
          console.log("Response Data:", data); // Log the response data
          setTotalBalance(data.total_usd_value); // Assuming the response contains total_usd_value
        } catch (error) {
          console.error("Error fetching total balance data:", error.message); // Log error message
        } finally {
          setLoading(false);
        }
      };

      fetchTotalBalance();
    } else {
      console.log("User is not signed in or wallet address is not available."); // Log if user is not signed in
    }
  }, [isSignedIn, user, walletAddress]); // Add walletAddress to dependencies

  if (!isUserLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your portfolio</h1>
        <Button onClick={() => window.location.href = '/sign-in'}>Sign In</Button>
      </div>
    );
  }

  if (loading) {
    return <div>Loading total balance...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Portfolio</h1>
      <div className="flex items-center mb-4">
        <img src={user.profileImageUrl || '/default-profile.png'} alt={user.fullName || 'User'} className="w-12 h-12 rounded-full mr-2" />
        <h2 className="text-xl font-semibold">{user.fullName || user.email}</h2>
      </div>
      {totalBalance !== null ? (
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Total Balance: ${totalBalance.toLocaleString()}</p>
          </CardContent>
        </Card>
      ) : (
        <p>No portfolio data available.</p>
      )}
    </div>
  );
}