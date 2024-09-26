'use client'; // Ensure this is a Client Component

import React from 'react'; // Import React
import './globals.css'; // Global styles
import { Header } from "@/components/header"; // Header component
import Footer from "@/app/footer"; // Footer component

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header /> {/* Include Header */}
                {children} {/* Render child components */}
                <Footer /> {/* Include Footer */}
            </body>
        </html>
    );
}
