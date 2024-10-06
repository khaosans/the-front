'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabaseClient'; // Ensure you have a supabase client instance
import '@/styles/globals.css';
import Layout from '@/components/Layout';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <SessionContextProvider supabaseClient={supabase}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <Layout>{children}</Layout>
                    </ThemeProvider>
                </SessionContextProvider>
            </body>
        </html>
    )
}