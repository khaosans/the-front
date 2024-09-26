'use client';

import React from 'react';

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="authenticated-layout">
            {children}
        </div>
    );
};

export default AuthenticatedLayout;