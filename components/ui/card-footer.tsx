'use client';

import React from 'react';

interface CardFooterProps {
    children: React.ReactNode;
    className?: string; // Optional className for additional styling
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
    return (
        <div className={`p-4 border-t border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

export default CardFooter;