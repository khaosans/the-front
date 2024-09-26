'use client'; // Ensure this is a Client Component

import React from 'react';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import '../styles/globals.css'; // Import global CSS
import { useSession } from 'next-auth/react'; // Example for session management
import Header from "@/app/components/Header";
import Footer from "@/app/components/footer"; // Example import

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession();

    // Optionally, you can add loading state or redirect logic here
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {session && <Header session={session} />} {/* Render Header only if session exists */}
            <main>{children}</main>
            <Footer />
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
