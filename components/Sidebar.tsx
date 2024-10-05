'use client';

import React from 'react';
import Link from 'next/link'; // Use Next.js Link

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white w-64 h-full p-4">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <nav className="flex flex-col space-y-2">
                <Link href="/" className="hover:underline">
                    Board
                </Link>
                <Link href="/projects" className="hover:underline">
                    Projects
                </Link>
                <Link href="/ai-agents" className="hover:underline">
                    Agents
                </Link>
                <Link href="/tasks" className="hover:underline">
                    Tasks
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;