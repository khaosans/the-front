'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // Change this line
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

export default function SignUpPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const supabase = createClient(); // Create the client here

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
			});
			if (error) throw error;
			// Redirect to a confirmation page or show a success message
			router.push('/signup-success');
		} catch (error) {
			console.error('Error signing up:', error);
			alert('Error signing up. Please try again.');
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Sign Up for Quantumlabs</CardTitle>
					<CardDescription>Create your account to get started</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignUp} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">Sign Up</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
