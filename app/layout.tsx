'use client'; // Ensure this is a Client Component

import React from 'react'; // Import React
import './globals.css'; // Global styles
import { Header } from './header';
import Footer from "@/app/footer"; // Import Header component

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header /> {/* Include Header */}
                <main>{children}</main> {/* Render child components */}
                <Footer /> {/* Include Footer */}
            </body>
        </html>
    );
}
