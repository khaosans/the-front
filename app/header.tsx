'use client';

import React from 'react';

const Header: React.FC<{ session: any }> = ({ session }) => {
    return (
        <header className="header">
            <h1>Welcome, {session.user.name}</h1>
            {/* Other header content */}
        </header>
    );
};

export default Header;
