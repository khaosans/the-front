'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {  CardContent, Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Separator } from "@/app/components/ui/separator";
import CardDescription from "@/app/components/ui/card-description";
import CardFooter from "@/app/components/ui/card-footer";

export default function SignUpPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleEmailSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically handle the email/password sign-up logic
		console.log('Sign-up attempted with:', name, email, password);
		// After successful sign-up, redirect to dashboard
		router.push('/dashboard');
	};

	const handleGoogleSignUp = () => {
		// Here you would typically handle the Google sign-up logic
		console.log('Google sign-up attempted');
		// After successful sign-up, redirect to dashboard
		router.push('/dashboard');
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					<CardDescription>Create your account</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="email" className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="email">Email</TabsTrigger>
							<TabsTrigger value="google">Google</TabsTrigger>
						</TabsList>
						<TabsContent value="email">
							<form onSubmit={handleEmailSignUp} className="space-y-4">
								<div className="space-y-2">
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
								<Button type="submit" className="w-full">Sign Up with Email</Button>
							</form>
						</TabsContent>
						<TabsContent value="google">
							<Button onClick={handleGoogleSignUp} className="w-full">
								Sign Up with Google
							</Button>
						</TabsContent>
					</Tabs>
				</CardContent>
				<Separator className="my-4" />
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<Link href="/login" className="text-primary hover:underline">
							Login
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
