'use client'; // Ensure this is a Client Component

import React from 'react'; // Import React
import './globals.css'; // Global styles
import { Header } from './header';
import { Footer } from './footer'; // Import Footer component

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
