'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Header from './Header';
import { useRouter } from 'next/navigation';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        router.push('/');
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        router.push('/');
      } else if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AuthenticatedLayout;