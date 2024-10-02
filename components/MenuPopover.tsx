"use client"

import { useState } from 'react';
import Dropdown from './Dropdown'; // Ensure the path is correct

const MenuPopover = () => {
    const dropdownItems = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
    ];

    return (
        <Dropdown items={dropdownItems} buttonLabel="Menu" />
    );
};

export default MenuPopover;