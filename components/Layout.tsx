import React from 'react';
import Nav from './Nav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
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