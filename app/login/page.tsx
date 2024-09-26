'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleEmailLogin = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically handle the email/password login logic
		console.log('Login attempted with:', email, password);
		// After successful login, redirect to dashboard
		router.push('/dashboard');
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Login</CardTitle>
					<p className="text-gray-600">Choose your login method</p>
				</CardHeader>
				<CardContent>
					<div className="flex mb-4">
						<button className="flex-1 py-2 bg-white text-black font-semibold border border-gray-300 rounded-l-md">Email</button>
						<button className="flex-1 py-2 bg-gray-100 text-gray-600 font-semibold border border-gray-300 rounded-r-md">Google</button>
					</div>
					<form onSubmit={handleEmailLogin} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" className="w-full bg-black text-white">Login with Email</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-600">
						Don't have an account?{" "}
						<Link href="/signup" className="text-black font-semibold hover:underline">
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
