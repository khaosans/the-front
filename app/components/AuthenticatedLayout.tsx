'use client';

import React from 'react';

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">My Application</h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;