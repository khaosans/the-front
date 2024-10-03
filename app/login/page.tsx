'use client';

import React from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

const LoginPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <h1>Login Page</h1>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
            {/* Rest of your login form */}
        </div>
    );

};

export default LoginPage;
