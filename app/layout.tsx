'use client'; // Ensure this is a Client Component

import React from 'react';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import '../styles/globals.css'; // Import global CSS
import { useSession } from 'next-auth/react';
import {Header} from "@/app/header";
import Footer from "@/app/footer"; // Example for session management

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession();

    // Optionally, you can add loading state or redirect logic here
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {session ? ( // Check if the user is authenticated
                <>
                    <Header session={session} /> {/* Render Header for authenticated users */}
                    <main>{children}</main>
                    <Footer /> {/* Render Footer for authenticated users */}
                </>
            ) : (
                <main>{children}</main> // Render only the main content for non-authenticated users
            )}
        </div>
    );
};

// Wrap the Layout component with SessionProvider
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SessionProvider>
            <html lang="en"> {/* Add the <html> tag */}
                <body> {/* Add the <body> tag */}
                    <Layout>{children}</Layout>
                </body>
            </html>
        </SessionProvider>
    );
};

export default AppLayout;
