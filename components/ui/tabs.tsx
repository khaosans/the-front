import React from 'react';

interface TabsProps {
    defaultValue: string,
    children: React.ReactNode,
    className?: string
}

export const Tabs: React.FC<TabsProps> = ({defaultValue, children, className}) => {
    return <div className="tabs">{children}</div>;
};

export const TabsList: React.FC<{ children: React.ReactNode, className?: string }> = ({children, className}) => {
    return <div className="tabs-list">{children}</div>;
};

export const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({value, children}) => {
    return <button className="tab-trigger">{children}</button>;
};

export const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({value, children}) => {
    return <div className="tab-content">{children}</div>;
};
