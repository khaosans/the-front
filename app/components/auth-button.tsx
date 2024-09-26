'use client';

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { signOut } from '@/app/actions/auth';
import { User } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const AuthButton: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
        router.push('/board');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    router.push('/');
  };

  // Rest of your component code...
  return (
    <>
      {user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button>Sign In</button>
      )}
    </>
  );
};

export default AuthButton;
