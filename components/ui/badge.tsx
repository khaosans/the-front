'use client';

import React from 'react';
import { cn } from "@/lib/utils";

type BadgeVariant = 'default' | 'destructive' | 'secondary';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', children }) => {
  const variantClasses = {
    default: 'bg-blue-500 text-white',
    destructive: 'bg-red-500 text-white',
    secondary: 'bg-gray-300 text-gray-900',
  };

  return (
    <span className={cn("inline-flex items-center px-2 py-1 rounded", variantClasses[variant])}>
      {children}
    </span>
  );
};

export { Badge };