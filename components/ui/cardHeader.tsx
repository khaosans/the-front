import React from 'react';

interface CardHeaderProps {
    children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
    return <div className="border-b border-gray-200 pb-2">{children}</div>;
};