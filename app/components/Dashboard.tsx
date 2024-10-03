import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase/client';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/'); // Redirect to landing page if not authenticated
            } else {
                setLoading(false);
            }
        };

        checkSession();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <div>Welcome to the Dashboard!</div>;
};

export default Dashboard;