import React from 'react';

interface CardDescriptionProps {
    children: React.ReactNode;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children }) => {
    return (
        <p className="text-sm text-gray-500">
            {children}
        </p>
    );
};

export default CardDescription;