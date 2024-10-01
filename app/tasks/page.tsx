'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { PlusCircle, Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockClient, Task } from '@/lib/mockClient'
import Spinner from '@/app/components/Spinner'

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      try {
        const fetchedTasks = await mockClient.fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        toast({
          title: "Error",
          description: "Failed to load tasks. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false)
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as 'todo' | 'in-progress' | 'completed',
      dueDate: formData.get('dueDate') as string,
      assignee: formData.get('assignee') as string,
    };
    setTasks([...tasks, newTask]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Success",
      description: "Task created successfully.",
    });
  };

  const handleEditTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentTask) return;
    const formData = new FormData(event.currentTarget);
    const updatedTask: Task = {
      ...currentTask,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as 'todo' | 'in-progress' | 'completed',
      dueDate: formData.get('dueDate') as string,
      assignee: formData.get('assignee') as string,
    };
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setIsEditDialogOpen(false);
    setCurrentTask(null);
    toast({
      title: "Success",
      description: "Task updated successfully.",
    });
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner />

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="pl-8" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="mb-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
            setCurrentTask(task);
            setIsEditDialogOpen(true);
          }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                {task.title}
              </CardTitle>
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {task.status}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
              <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
              <p className="text-xs text-muted-foreground">Assignee: {task.assignee}</p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTask}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" name="title" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input id="description" name="description" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select name="status" defaultValue="todo">
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
                <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">Assignee</Label>
                <Input id="assignee" name="assignee" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditTask}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">Title</Label>
                <Input id="edit-title" name="title" className="col-span-3" defaultValue={currentTask?.title} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">Description</Label>
                <Input id="edit-description" name="description" className="col-span-3" defaultValue={currentTask?.description} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
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
                <Label htmlFor="edit-dueDate" className="text-right">Due Date</Label>
                <Input id="edit-dueDate" name="dueDate" type="date" className="col-span-3" defaultValue={currentTask?.dueDate} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-assignee" className="text-right">Assignee</Label>
                <Input id="edit-assignee" name="assignee" className="col-span-3" defaultValue={currentTask?.assignee} required />
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

export default TasksPage;