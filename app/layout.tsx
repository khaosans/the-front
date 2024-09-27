'use client'; // Ensure this is a Client Component

import React from 'react'; // Import React
import '../styles/globals.css' // Adjust this path if your global styles are located elsewhere
import { Header } from './header';
import Footer from '../components/footer'; // Import Footer component
import { ThemeProvider } from './contexts/ThemeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <div className="flex flex-col min-h-screen">
                        <Header /> {/* Include Header */}
                        <main className="flex-grow">{children}</main> {/* Render child components */}
                        <Footer /> {/* Include Footer */}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
