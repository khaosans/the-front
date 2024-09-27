'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from './contexts/ThemeContext';
import { useRouter, usePathname } from 'next/navigation';

// This is a placeholder. Replace with your actual auth check
const isUserLoggedIn = () => {
  // Implement your auth check logic here
  return true; // Change this to false to test logged-out state
};

// This is a placeholder. Replace with your actual sign-out logic
const signOut = async () => {
  // Implement your sign-out logic here
  console.log('User signed out');
};

export const Header: React.FC = () => {
	const { theme, toggleTheme } = useTheme();
	const router = useRouter();
	const pathname = usePathname();

	const handleSignOut = async () => {
		await signOut();
		router.push('/login');
	};

	const isAuthPage = pathname === '/login' || pathname === '/signup';

	const getHeaderClasses = () => {
		return theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-gray-100';
	};

	return (
		<header className={`w-full py-4 ${getHeaderClasses()}`}>
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center">
					<div className="text-xl font-bold">
						<Link href="/">QuantumLabs</Link>
					</div>
					{!isAuthPage && (
						<nav>
							<ul className="flex space-x-4 items-center">
								{isUserLoggedIn() ? (
									<>
										<li>
											<button 
												onClick={toggleTheme}
												className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
												aria-label="Toggle theme"
											>
												{theme === 'light' ? (
													<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
													</svg>
												) : (
													<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
													</svg>
												)}
											</button>
										</li>
										<li><Link href="/dashboard" className={`hover:underline ${pathname === '/dashboard' ? 'font-bold' : ''}`}>Dashboard</Link></li>
										<li><Link href="/taskboard" className={`hover:underline ${pathname === '/taskboard' ? 'font-bold' : ''}`}>Taskboard</Link></li>
										<li><Link href="/team/manage" className={`hover:underline ${pathname === '/team/manage' ? 'font-bold' : ''}`}>Manage Team</Link></li>
										<li><Link href="/settings" className={`hover:underline ${pathname === '/settings' ? 'font-bold' : ''}`}>Settings</Link></li>
										<li><Link href="/profile" className={`hover:underline ${pathname === '/profile' ? 'font-bold' : ''}`}>Profile</Link></li>
										<li>
											<button 
												onClick={handleSignOut}
												className={`px-3 py-1 rounded ${theme === 'darker' ? 'bg-red-800 hover:bg-red-900' : theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
											>
												Sign Out
											</button>
										</li>
									</>
								) : (
									<li>
										<Link 
											href="/login"
											className={`px-3 py-1 rounded ${theme === 'darker' ? 'bg-blue-800 hover:bg-blue-900' : theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
										>
											Sign In
										</Link>
									</li>
								)}
							</ul>
						</nav>
					)}
				</div>
			</div>
		</header>
	);
};
