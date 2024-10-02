'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

const ConsoleHub: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to Your Console Hub</h1>
            <p className="text-lg text-gray-600 mb-8">Manage your tasks, projects, and teams efficiently.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">Overview of tasks and projects.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Teams</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">Manage your teams and their members.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">View and manage all members.</p>
                    </CardContent>
                </Card>
            </div>

            <Button variant="outline" className="mt-6">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
            </Button>
        </div>
    );
};

export default ConsoleHub;