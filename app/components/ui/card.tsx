'use client';

import React, { FC, ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
    return <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>;
};

export { Card };
export { CardHeader } from './cardHeader'; // Export CardHeader
export { CardTitle } from './cardTitle'; // Export CardTitle
export { CardDescription } from './cardDescription'; // Export CardDescription
export { CardContent } from './cardContent'; // Export CardContent
export { CardFooter } from './cardFooter'; // Export CardFooter
