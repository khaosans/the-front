'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext';
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import logger from '@/lib/logger'; // Import the logger

export default function SignupPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const supabase = createClientComponentClient();
	const themeContext = useTheme();
	const theme = themeContext?.theme ?? 'light';

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		try {
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) throw error;
			toast.success('Account created successfully');
			router.push('/login'); // Redirect to login after signup
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
				toast.error(error.message);
				logger.error('Signup error'); // Use logger instead of console
			} else {
				setError('An unknown error occurred');
				toast.error('An unknown error occurred');
				logger.error('Signup error: An unknown error occurred'); // Use logger instead of console
			}
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
				},
			});
			if (error) throw error;
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
				logger.error('Google sign-in error'); // Use logger instead of console
			} else {
				toast.error('An unknown error occurred');
				logger.error('Google sign-in error: An unknown error occurred'); // Use logger instead of console
			}
		}
	};

	return (
		<div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'} py-12 px-4 sm:px-6 lg:px-8`}>
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className={`mt-6 text-center text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
						Create your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="rounded-md shadow-sm -space-y-px">
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
								className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'} rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
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
								autoComplete="current-password"
								required
								className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'} rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					{error && <div className="text-red-500 text-sm">{error}</div>}

					<div>
						<button
							type="submit"
							className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
						>
							Sign up
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
							onClick={handleGoogleSignIn}
							className={`w-full bg-blue-600 hover:bg-blue-700 text-white`}
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
