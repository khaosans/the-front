'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext'; // Corrected import path
import '@/styles/globals.css'; // Adjust this path if needed
import TopBar from '@/components/TopBar'; // Import the TopBar component
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'; // Ensure this path is correct

interface LayoutProps {
    children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <RobotTransformerWallpaper /> {/* Add the wallpaper component */}
                    <TopBar />

                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;