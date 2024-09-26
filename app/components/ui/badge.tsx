'use client';

import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'default' | 'destructive' | 'secondary' }> = ({ children, variant }) => {
  const variantStyles = variant === 'destructive' ? 'bg-red-500 text-white' : variant === 'secondary' ? 'bg-gray-300 text-black' : 'bg-gray-200 text-black';

  return (
    <span className={`inline-block px-2 py-1 rounded ${variantStyles}`}>
      {children}
    </span>
  );
};