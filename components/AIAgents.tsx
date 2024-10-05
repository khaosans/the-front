'use client';

import React from 'react';
import Link from 'next/link'; // Use Next.js Link

const AIAgents: React.FC = () => {
    const agents = [
        { name: 'Assistant A', link: '/agents/assistant-a' },
        { name: 'Assistant B', link: '/agents/assistant-b' },
        { name: 'Assistant C', link: '/agents/assistant-c' },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">AI Agents</h1>
            <ul>
                {agents.map((agent, index) => (
                    <li key={index} className="mb-2">
                        <Link href={agent.link} className="text-blue-500 hover:underline">
                            {agent.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AIAgents;