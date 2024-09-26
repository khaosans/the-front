import React from 'react';

interface CardContentProps {
    children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
    return <div className="py-4">{children}</div>; // Add padding or styles as needed
};