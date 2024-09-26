import React from 'react';

interface CardTitleProps {
    children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
    return <h2 className="text-lg font-bold">{children}</h2>;
};