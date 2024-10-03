"use client"

import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

const NavBar = () => {
    return (
        <nav className="relative">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
                </li>
                <li>
                    <Link href="/profile" className="text-gray-700 hover:text-gray-900">Profile</Link>
                </li>
                <li>
                    <Link href="/settings" className="text-gray-700 hover:text-gray-900">Settings</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;