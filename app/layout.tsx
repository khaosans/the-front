'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TopBar from '@/components/TopBar';
import ChatbotModal from '@/components/ChatbotModal';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import Loading from './loading';
import { GeistProvider } from '@geist-ui/react';
import ToastContainer from '@/components/ToastContainer';
import NavBar from '@/components/NavBar';
import { Inter } from 'next/font/google'; // Updated import

const inter = Inter({ subsets: ['latin'] });

const Layout: React.FC = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const noTopBarRoutes = ['/login', '/signup', '/forgot-password'];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Prevent rendering until the component is mounted
    }

    return (
        <div className={inter.className}>
            {!noTopBarRoutes.includes(router.pathname) && <TopBar onChatOpen={() => console.log('Chat opened')} />}
            <main>{children}</main>
        </div>
    );
};

export default Layout;