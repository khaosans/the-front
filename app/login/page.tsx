'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Separator } from "@/app/components/ui/separator";
import {CardDescription} from "@/app/components/ui/card-description";
import CardFooter from "@/app/components/ui/card-footer";

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically handle the email/password login logic
		console.log('Login attempted with:', email, password);
		// After successful login, redirect to dashboard
		router.push('/dashboard');
	};

	const handleGoogleLogin = () => {
		// Here you would typically handle the Google login logic
		console.log('Google login attempted');
		// After successful login, redirect to dashboard
		router.push('/dashboard');
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Choose your login method</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="email" className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="email">Email</TabsTrigger>
							<TabsTrigger value="google">Google</TabsTrigger>
						</TabsList>
						<TabsContent value="email">
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
								<Button type="submit" className="w-full">Login with Email</Button>
							</form>
						</TabsContent>
						<TabsContent value="google">
							<Button onClick={handleGoogleLogin} className="w-full">
								Login with Google
							</Button>
						</TabsContent>
					</Tabs>
				</CardContent>
				<Separator className="my-4" />
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-600">
						Don't have an account?{" "}
						<Link href="/signup" className="text-primary hover:underline">
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
