'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  getThemeClasses: () => string;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const initialTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') as Theme | null : 'light';
  const [theme, setTheme] = useState(initialTheme || 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : theme === 'dark' ? 'darker' : 'light');
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white text-gray-900';
      case 'dark':
        return 'bg-gray-800 text-gray-100';
      case 'darker':
        return 'bg-gray-900 text-gray-50';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const value = {
    theme,
    toggleTheme,
    getThemeClasses,
    isDark: theme === 'dark' || theme === 'darker'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
