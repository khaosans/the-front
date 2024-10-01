'use client';

import React, { useState, useEffect } from 'react';
import { mockClient } from '@/lib/mockClient';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlusCircle, Search, Bell, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Label } from '@/components/forms/label';
import {Task} from "@/lib/task";
import {Project} from "@/lib/project";
import {ActivityData} from "@/lib/activityData";
import Spinner from "@/components/ui/spinner";

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [isNewTeamDialogOpen, setIsNewTeamDialogOpen] = useState(false);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedTasks, fetchedProjects, fetchedActivityData] = await Promise.all([
          mockClient.fetchTasks(),
          mockClient.fetchProjects(),
          mockClient.fetchWeeklyActivity()
        ]);
        setTasks(fetchedTasks as Task[]);
        setProjects(fetchedProjects);
        setActivityData(fetchedActivityData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log('New Team:', {
      name: formData.get('name'),
      description: formData.get('description'),
    });
    setIsNewTeamDialogOpen(false);
    toast.success("New team created successfully.");
  };

  const handleCreateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      description: '',
      progress: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      teamId: '',
    };
    setProjects([...projects, newProject]);
    setIsNewProjectDialogOpen(false);
    toast.success("New project created successfully.");
  };

  const handleEditTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentTask) return;
    const formData = new FormData(event.currentTarget);
    const updatedTask: Task = {
      ...currentTask,
      title: formData.get('title') as string,
      status: formData.get('status') as 'todo' | 'in-progress' | 'completed',
      dueDate: formData.get('dueDate') as string,
    };
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setIsEditTaskDialogOpen(false);
    setCurrentTask(null);
    toast.success("Task updated successfully.");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
        <Spinner size={80} color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing Projects</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              +1 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              -1 since yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Recent Tasks</CardTitle>
            <Button onClick={() => setIsNewProjectDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="mb-4 last:mb-0 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => {
                    setCurrentTask(task);
                    setIsEditTaskDialogOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Project Progress</CardTitle>
            <Button onClick={() => setIsNewTeamDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Team
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {projects.map((project) => (
                <div key={project.id} className="mb-4 last:mb-0">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{project.name}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Dialog open={isNewTeamDialogOpen} onOpenChange={setIsNewTeamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTeam}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" name="description" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Team</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateProject}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-name" className="text-right">Name</Label>
                <Input id="project-name" name="name" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditTaskDialogOpen} onOpenChange={setIsEditTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditTask}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task-title" className="text-right">Title</Label>
                <Input id="task-title" name="title" className="col-span-3" defaultValue={currentTask?.title} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task-status" className="text-right">Status</Label>
                <Select name="status" defaultValue={currentTask?.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="task-due-date" className="text-right">Due Date</Label>
                <Input id="task-due-date" name="dueDate" type="date" className="col-span-3" defaultValue={currentTask?.dueDate} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
