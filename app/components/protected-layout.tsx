'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>; // Show loading state while checking session
    }

    if (!session) {
        // Do not redirect for login and signup pages
        return <>{children}</>; // Render children if not authenticated
    }

    return <>{children}</>; // Render children if authenticated
};

export default ProtectedLayout;