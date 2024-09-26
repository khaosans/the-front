'use client';

import React from 'react';

export const ScrollArea: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};