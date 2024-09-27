'use client'; // Ensure this is a Client Component

import React from 'react'; // Import React
import '../styles/globals.css' // Adjust this path if your global styles are located elsewhere
import { Header } from './header';
import Footer from '../components/Footer'; // Import Footer component
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const ThemedLayout = ({ children }: { children: React.ReactNode }) => {
	const { getThemeClasses } = useTheme();

	return (
		<div className={`min-h-screen flex flex-col ${getThemeClasses()}`}>
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider>
					<ThemedLayout>{children}</ThemedLayout>
				</ThemeProvider>
			</body>
		</html>
	);
}
