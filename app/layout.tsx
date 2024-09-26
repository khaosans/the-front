'use client'; // Ensure this is a Client Component

import React, { useEffect } from 'react'; // Import React
import './globals.css'; // Global styles
import { Header } from './header';
import { Footer } from './footer'; // Import Footer component
import { getStoredTheme, setTheme } from '@/lib/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const storedTheme = getStoredTheme();
        setTheme(storedTheme);
    }, []);

    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <Header /> {/* Include Header */}
                <main className="flex-grow">{children}</main> {/* Render child components */}
                <Footer /> {/* Include Footer */}
            </body>
        </html>
    );
}
