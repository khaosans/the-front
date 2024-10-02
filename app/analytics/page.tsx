'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import CryptoPriceGraph from '@/components/CryptoPriceGraph'; // Import the new component
import MarketCapGraph from '@/components/MarketCapGraph'; // Import the MarketCapGraph component

const AnalyticsPage: React.FC = () => {
    const [taskStatusData, setTaskStatusData] = useState([
        { name: 'Completed', value: Math.floor(Math.random() * 100) },
        { name: 'In Progress', value: Math.floor(Math.random() * 100) },
        { name: 'To Do', value: Math.floor(Math.random() * 100) },
    ]);

    const [teamPerformanceData, setTeamPerformanceData] = useState([
        { name: 'Team Alpha', tasksCompleted: Math.floor(Math.random() * 200), tasksInProgress: Math.floor(Math.random() * 100) },
        { name: 'Team Beta', tasksCompleted: Math.floor(Math.random() * 200), tasksInProgress: Math.floor(Math.random() * 100) },
        { name: 'Team Gamma', tasksCompleted: Math.floor(Math.random() * 200), tasksInProgress: Math.floor(Math.random() * 100) },
    ]);

    // Function to simulate live updates
    const updateData = () => {
        setTaskStatusData(prevData => prevData.map(item => ({
            ...item,
            value: Math.floor(Math.random() * 100), // Randomize values
        })));

        setTeamPerformanceData(prevData => prevData.map(item => ({
            ...item,
            tasksCompleted: Math.floor(Math.random() * 200),
            tasksInProgress: Math.floor(Math.random() * 100),
        })));
    };

    useEffect(() => {
        const interval = setInterval(updateData, 5000); // Update every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Analytics Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Task Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={taskStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {taskStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#10B981', '#3B82F6', '#EF4444'][index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Team Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={teamPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <RechartsTooltip />
                                <Bar dataKey="tasksCompleted" fill="#10B981" />
                                <Bar dataKey="tasksInProgress" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Crypto Price Graph</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CryptoPriceGraph /> {/* Add the Crypto Price Graph here */}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Market Cap Graph</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MarketCapGraph /> {/* Add the Market Cap Graph here */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsPage;