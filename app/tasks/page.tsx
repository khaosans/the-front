'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle, Clock, Plus, Search } from 'lucide-react';
import { toast } from "react-hot-toast";
import DynamicWallpaper from '@/components/dynamic-wallpaper';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

const tasks: Task[] = [
  { id: '1', title: 'Design new logo', description: 'Create a new logo for the company', status: 'In Progress' },
  { id: '2', title: 'Update user documentation', description: 'Review and update the user guide', status: 'To Do' },
  { id: '3', title: 'Fix login bug', description: 'Resolve the issue with user login', status: 'Completed' },
  { id: '4', title: 'Implement new feature', description: 'Add the requested new feature to the app', status: 'In Progress' },
];

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add task creation logic here
    setIsCreateDialogOpen(false);
    toast.success("Task created successfully.");
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="text-green-500" />;
      case 'In Progress':
        return <Clock className="text-yellow-500" />;
      default:
        return <Clock className="text-gray-500" />;
    }
  };

  return (
    <>
      <DynamicWallpaper primaryColor="yellow" secondaryColor="orange" />
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Tasks</h1>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-yellow-400">
                    <span>{task.title}</span>
                    {getStatusIcon(task.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-2">{task.description}</p>
                  <p className="text-sm text-gray-400">Status: {task.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateTask}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right">Title</label>
                    <Input id="title" name="title" className="col-span-3 bg-gray-700 border-gray-600 text-white" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="text-right">Description</label>
                    <Input id="description" name="description" className="col-span-3 bg-gray-700 border-gray-600 text-white" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}