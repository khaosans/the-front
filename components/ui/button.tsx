'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'ghost',
    fullWidth?: boolean,
    size?: 'sm' | 'md' | 'lg' | 'icon'
}

export const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    fullWidth = false,
    size = 'md',
    className = '',
    ...props 
}) => {
    const baseClass = 'btn';
    const variantClass = variant === 'secondary' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 
                         variant === 'ghost' ? 'bg-transparent hover:bg-gray-100' : 
                         'bg-primary text-white hover:bg-primary-dark';
    const sizeClass = size === 'sm' ? 'text-sm py-1 px-2' :
                      size === 'lg' ? 'text-lg py-3 px-6' :
                      size === 'icon' ? 'p-2' : 'py-2 px-4';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button 
            className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
