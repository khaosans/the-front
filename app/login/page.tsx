'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import Image from 'next/image'; // Import Image from Next.js

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.error('Login error:', error.message);
		} else {
			router.push('/dashboard'); // Redirect to dashboard on successful login
		}
	};

	const handleGoogleLogin = async () => {
		const supabase = createClient();
		const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
		if (error) {
			console.error('Google login error:', error.message);
		} else {
			router.push('/dashboard'); // Redirect to dashboard on successful login
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Login</CardTitle>
					<p className="text-gray-600">Welcome back! Please log in.</p>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleEmailLogin} className="space-y-4"> {/* Reduced spacing */}
						<div className="space-y-1"> {/* Reduced spacing */}
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
						<div className="space-y-1"> {/* Reduced spacing */}
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
					<div className="mt-4">
						<Button onClick={handleGoogleLogin} className="w-full bg-red-600 text-white flex items-center justify-center">
							<Image src="/images/google.svg" alt="Google Logo" width={20} height={20} className="mr-2" />
							Login with Google
						</Button>
					</div>
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
