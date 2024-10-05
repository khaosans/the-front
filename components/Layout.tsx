import React from 'react';
import Nav from './Nav';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'; // Ensure this path is correct

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <RobotTransformerWallpaper /> {/* Add the wallpaper component */}
      <Nav />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>© 2023 Your Company</p>
      </footer>
    </div>
  );
};

export default Layout;