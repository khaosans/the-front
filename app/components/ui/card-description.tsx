'use client';

import React from 'react';

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p className="text-sm text-gray-500">
      {children}
    </p>
  );
};