import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from '@/utils/session';

const withAuth = (WrappedComponent: React.FC) => {
    const AuthenticatedComponent: React.FC = (props) => {
        const router = useRouter();

        useEffect(() => {
            const checkAuth = async () => {
                const session = await getSession();
                if (!session) {
                    router.push('/login');
                }
            };
            checkAuth();
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;