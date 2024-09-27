'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
	const { isDark } = useTheme();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const supabase = createClientComponentClient();
	const { theme } = useTheme();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/auth/callback`,
				},
			});
			if (error) throw error;
			toast.success('Signup successful! Please check your email for confirmation.');
			router.push('/login?message=Please check your email to confirm your account');
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignUp = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
				},
			});
			if (error) throw error;
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className={`min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className={`mt-6 text-center text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
						Create your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
									theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : ''
								}`}
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								required
								className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
									theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : ''
								}`}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
								theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : ''
							}`}
						>
							{isLoading ? 'Signing up...' : 'Sign up'}
						</button>
					</div>
				</form>
				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
              <span className={`px-2 ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
                Or continue with
              </span>
						</div>
					</div>

					<div className="mt-6">
						<Button
							onClick={handleGoogleSignUp}
							className={`w-full ${isDark ? 'bg-blue-800 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white`}
						>
							<Image
								src="/images/google.svg"
								alt="Google logo"
								width={20}
								height={20}
								className="mr-2"
							/>
							Sign up with Google
						</Button>
					</div>
				</div>

				<div className="text-center">
					<p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
						Already have an account?{' '}
						<Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
