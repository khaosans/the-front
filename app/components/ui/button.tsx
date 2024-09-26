'use client';

import React from 'react';

export const Button: React.FC<{
    children: React.ReactNode,
    className?: string,
    variant?: 'outline' | 'ghost',
    size?: string,
    onClick?: () => void
}> = ({children, className, variant, size, onClick}) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none';
  const variantStyles = variant === 'outline' ? 'border border-gray-300 text-gray-700' : variant === 'ghost' ? 'text-gray-700' : 'bg-blue-600 text-white';

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
};
