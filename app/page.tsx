import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to QuantumLabs</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Manage your tasks and projects efficiently with our cutting-edge project management tool.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </div>
  );
}
