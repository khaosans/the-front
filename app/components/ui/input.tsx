'use client';

import React from 'react';

export const Input: React.FC<{ placeholder?: string; className?: string }> = ({ placeholder, className }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`border border-gray-300 rounded-md p-2 ${className}`}
    />
  );
};