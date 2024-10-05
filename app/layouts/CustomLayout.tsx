import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'; // Ensure this path is correct

interface CustomLayoutProps {
    children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <RobotTransformerWallpaper /> {/* Add the wallpaper component */}
            <div>
                {/* Custom layout structure */}
                {children}
            </div>
        </ThemeProvider>
    );
};

export default CustomLayout;