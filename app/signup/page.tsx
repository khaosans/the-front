'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import supabase  from "@/utils/supabase/client"; // Ensure Supabase client is imported
import Image from 'next/image'; // Ensure correct import

export default function SignUpPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleEmailSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error('Sign up error:', error.message);
		} else {
			router.push('/dashboard'); // Redirect to dashboard on successful sign-up
		}
	};

	const handleGoogleSignUp = async () => {
		const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
		if (error) {
			console.error('Google sign-up error:', error.message);
		} else {
			router.push('/dashboard'); // Redirect to dashboard on successful sign-up
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
					<p className="text-gray-600">Create your account</p>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleEmailSignUp} className="space-y-4">
						<div className="space-y-1">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="text"
								placeholder="John Doe"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-1">
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
						<div className="space-y-1">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" className="w-full bg-black text-white">Sign Up with Email</Button>
					</form>
					<div className="mt-4">
						<Button onClick={handleGoogleSignUp} className="w-full bg-red-600 text-white flex items-center justify-center">
							<Image src="/images/google.svg" alt="Google Logo" width={20} height={20} className="mr-2" />
							Sign Up with Google
						</Button>
					</div>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<Link href="/login" className="text-black font-semibold hover:underline">
							Login
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
