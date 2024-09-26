'use client'; // Ensure this is a Client Component

import React from 'react';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import './globals.css'; // Update this line
import { useSession } from 'next-auth/react';
import { Header } from "@/components/header"; // Update this import
import Footer from "@/app/footer"; // Example for session management

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {session ? (
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

// Wrap the Layout component with SessionProvider
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SessionProvider>
            <html lang="en">
                <body>
                    <Layout>{children}</Layout>
                </body>
            </html>
        </SessionProvider>
    );
};

export default AppLayout;
