'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default CommonLayout;