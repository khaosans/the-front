import React from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const AuthorizedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session, loading } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (!loading && !session) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [loading, session, router]);

    if (loading) return <div>Loading...</div>; // Show loading state

    return (
        <div>
            {/* Add your authorized layout components here, e.g., header, sidebar */}
            {children}
        </div>
    );
};

export default AuthorizedLayout;