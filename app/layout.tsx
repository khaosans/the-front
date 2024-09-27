'use client'; // Ensure this is a Client Component

import React, { useState } from 'react'; // Import React
import '../styles/globals.css' // Adjust this path if your global styles are located elsewhere
import { Header } from './header';
import Footer from '../components/Footer'; // Make sure this path is correct
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ChatIcon from '../components/ChatIcon';
import { ChatbotModal } from '../components/ChatbotModal';

const ThemedLayout = ({ children }: { children: React.ReactNode }) => {
	const { getThemeClasses } = useTheme();
	const [isChatOpen, setIsChatOpen] = useState(false);

	return (
		<div className={`min-h-screen flex flex-col ${getThemeClasses()}`}>
			<Header />
			<main className="flex-grow pb-20">{children}</main>
			<Footer />
			<ChatIcon onClick={() => setIsChatOpen(true)} />
			<ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
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
