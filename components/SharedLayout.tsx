'use client';

import React from 'react';
import RobotTransformerWallpaper from './RobotTransformerWallpaper';

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <RobotTransformerWallpaper />
      <div className="relative z-10 container mx-auto p-6 text-white">
        {children}
      </div>
    </div>
  );
};

export default SharedLayout;