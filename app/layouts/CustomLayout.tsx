import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';

interface CustomLayoutProps {
    children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <div>
                {/* Custom layout structure */}
                {children}
            </div>
        </ThemeProvider>
    );
};

export default CustomLayout;