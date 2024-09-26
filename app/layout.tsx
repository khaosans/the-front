'use client'; // Ensure this is a Client Component

import React, { useState } from 'react'; // Import useState for local state management
import './globals.css'; // Update this line
import { Header } from "@/components/header"; // Update this import
import Footer from "@/app/footer"; // Example for session management

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Local state for login status

    return (
        <div>
            {isLoggedIn ? ( // Check local state instead of session
                <>
                    <Header /> {/* Use the new Header component */}

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
                    <Footer />
                </>
            ) : (
                <main>{children}</main>
            )}
        </div>
    );
};

// Wrap the Layout component without SessionProvider
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
            <html lang="en">
                <body>
                    <Layout>{children}</Layout>
                </body>
            </html>
    );
};

export default AppLayout;
