'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import Taskboard from '@/components/taskboard';

const TaskboardPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Taskboard</h1>
            <Button variant="outline" className="mb-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
            </Button>

            <Taskboard initialTasks={[]} /> {/* Render the Taskboard component */}
        </div>
    );
};

export default TaskboardPage;