'use client';

import React from 'react';
import { Header } from './Header'; // Import the Header component

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header /> {/* Include the Header here */}
      <main>{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;