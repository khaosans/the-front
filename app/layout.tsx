import { ReactNode } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import '@/styles/globals.css';
import TopBar from '@/components/TopBar';
import RoboticWallpaper from '../components/robotic-wallpaper';
import { metadata } from './metadata';

interface LayoutProps {
    children: ReactNode;
}

export { metadata };

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <RoboticWallpaper />
                    <TopBar />
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}