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

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  )
)

export const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({value, children}) => {
    return <div className="tab-content">{children}</div>;
};
