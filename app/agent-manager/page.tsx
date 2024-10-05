'use client';

import React from 'react';
import { Wrench, Globe, Database, FileText, User } from 'lucide-react'; // Importing the new icons
import Link from 'next/link';

const AgentManager: React.FC = () => {
    // Sample agent data for demonstration
    const agents = [
        { id: 1, avatar: 'AJ', name: 'Alice Johnson', type: 'Researcher', tools: ['Web Scraper', 'Database'], tasks: 15, successRate: '93.0%', score: 87, rank: 'Expert' },
        { id: 2, avatar: 'BS', name: 'Bob Smith', type: 'Front End', tools: ['Web Scraper'], tasks: 8, successRate: '75.0%', score: 60, rank: 'Intermediate' },
        { id: 3, avatar: 'CB', name: 'Charlie Brown', type: 'Product Manager', tools: ['Database', 'File Creator'], tasks: 20, successRate: '95.0%', score: 95, rank: 'Master' },
    ];

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold text-center mb-6">Agent Manager</h1>
            <Link href="/agent-manager/new" className="mb-4 inline-block bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">+ Add New Agent</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map(agent => (
                    <Link key={agent.id} href={`/agent-manager/${agent.id}`} className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105">
                        <div className="text-4xl mb-2">
                            <User className="h-10 w-10" />
                        </div>
                        <h2 className="text-xl font-semibold">{agent.name}</h2>
                        <p className="text-gray-400">{agent.type}</p>
                        <div className="flex space-x-2 mt-2">
                            {agent.tools.map(tool => (
                                <span key={tool}>
                                    {tool === 'Web Scraper' && <Globe className="h-6 w-6 text-gray-300" />}
                                    {tool === 'Database' && <Database className="h-6 w-6 text-gray-300" />}
                                    {tool === 'File Creator' && <FileText className="h-6 w-6 text-gray-300" />}
                                </span>
                            ))}
                        </div>
                        <div className="mt-2">
                            <span className={`inline-block px-2 py-1 text-white rounded ${agent.rank === 'Master' ? 'bg-green-500' : agent.rank === 'Expert' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                                {agent.rank}
                            </span>
                        </div>
                        <div className="mt-2 text-center">
                            <p>Tasks: {agent.tasks}</p>
                            <p>Success Rate: {agent.successRate}</p>
                            <p>Score: {agent.score}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AgentManager;