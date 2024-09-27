'use client'; // Ensure this is a Client Component

import React from 'react'; // Import React
import '../styles/globals.css' // Adjust this path if your global styles are located elsewhere
import { Header } from './header';
import Footer from '../components/Footer'; // Import Footer component
import { ThemeProvider } from './contexts/ThemeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <Header /> {/* Include Header */}
                    <main>{children}</main> {/* Render child components */}
                    <Footer /> {/* Include Footer */}
                </ThemeProvider>
            </body>
        </html>
    );
}
