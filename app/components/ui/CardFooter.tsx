import React from 'react';

interface CardFooterProps {
    children: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({ children }) => {
    return (
        <div className="flex justify-end mt-4">
            {children}
        </div>
    );
};

export default CardFooter;