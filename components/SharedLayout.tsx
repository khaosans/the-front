import React from 'react';

// Define the props to include children of type React.ReactNode
interface SharedLayoutProps {
  children: React.ReactNode;
}

// Update the component to use SharedLayoutProps
const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
    return (
        <div className="shared-layout">
            {children}
        </div>
    );
};

export default SharedLayout;