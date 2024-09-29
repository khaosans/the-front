import React, { ReactNode } from 'react';

interface AccordionProps {
    children: ReactNode;
    type: string;
    collapsible: boolean;
    className?: string;
}

interface AccordionItemProps {
    value: string;
    children: ReactNode;
}

interface AccordionTriggerProps {
    children: ReactNode;
}

interface AccordionContentProps {
    children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children, type, collapsible, className }) => {
    return <div className={className} data-type={type} data-collapsible={collapsible}>{children}</div>;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({ value, children }) => {
    return <div>{children}</div>;
};

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children }) => {
    return <button>{children}</button>;
};

export const AccordionContent: React.FC<AccordionContentProps> = ({ children }) => {
    return <div>{children}</div>;
};
