'use client';

import React, { FC, ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
}

interface CardHeaderProps {
    children: ReactNode;
}

interface CardTitleProps {
    children: ReactNode;
}

interface CardDescriptionProps {
    children: ReactNode;
}

interface CardContentProps {
    children: ReactNode;
}

interface CardFooterProps {
    children: ReactNode;
}

const Card: FC<CardProps> & {
    Header: FC<CardHeaderProps>;
    Title: FC<CardTitleProps>;
    Content: FC<CardContentProps>;
    Description: FC<CardDescriptionProps>;
    Footer: FC<CardFooterProps>;
} = ({ children }) => {
    return <div className="card">{children}</div>;
};

Card.Header = ({ children }) => <div className="card-header">{children}</div>;
Card.Title = ({ children }) => <h2 className="card-title">{children}</h2>;
Card.Content = ({ children }) => <div className="card-content">{children}</div>;
Card.Description = ({ children }) => <p className="card-description">{children}</p>;
Card.Footer = ({ children }) => <div className="card-footer">{children}</div>;

export { Card };
