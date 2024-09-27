'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from './contexts/ThemeContext';

export const Header: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<header className={`w-full py-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center">
					<div className="text-xl font-bold">
						<Link href="/">QuantumLabs</Link>
					</div>
					<nav>
						<ul className="flex space-x-4">
							<li><Link href="/" className="hover:underline">Home</Link></li>
							<li><Link href="/taskboard" className="hover:underline">Taskboard</Link></li>
							<li><Link href="/settings" className="hover:underline">Settings</Link></li>
							<li><Link href="/profile" className="hover:underline">Profile</Link></li>

						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};
