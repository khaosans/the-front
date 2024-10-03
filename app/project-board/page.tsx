'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MoreHorizontal, Calendar } from 'lucide-react';

const initialTasks = {
  'to-do': [
    { id: 't1', title: 'Research competitors', description: 'Analyze top 5 competitors', priority: 'high', dueDate: '2023-06-30' },
    { id: 't2', title: 'Create wireframes', description: 'Design wireframes for the new feature', priority: 'medium', dueDate: '2023-07-05' },
  ],
  'in-progress': [
    { id: 't3', title: 'Develop MVP', description: 'Build core features of the product', priority: 'medium', dueDate: '2023-07-15' },
  ],
  'done': [
    { id: 't4', title: 'User testing', description: 'Conduct user testing for the MVP', priority: 'low', dueDate: '2023-07-20' },
  ],
};

const ImprovedProjectBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newListTitle, setNewListTitle] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  const addList = () => {
    if (newListTitle.trim()) {
      setTasks({
        ...tasks,
        [newListTitle.toLowerCase().replace(/\s+/g, '-')]: [],
      });
      setNewListTitle('');
    }
  };

  const addTask = (columnId) => {
    const newTask = {
      id: `t${Date.now()}`,
      title: 'New Task',
      description: 'Task description',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
    };
    setTasks({
      ...tasks,
      [columnId]: [...tasks[columnId], newTask],
    });
  };

  const updateTask = (updatedTask) => {
    const columnId = Object.keys(tasks).find(column => 
      tasks[column].some(task => task.id === updatedTask.id)
    );
    setTasks({
      ...tasks,
      [columnId]: tasks[columnId].map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ),
    });
    setSelectedTask(null);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Project Board</h1>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="New list title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              className="w-48"
            />
            <Button onClick={addList}>Add List</Button>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(tasks).map(([columnId, columnTasks]) => (
              <div key={columnId} className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 capitalize">{columnId.replace('-', ' ')}</h2>
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 min-h-[200px]">
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200"
                            >
                              <CardHeader className="p-3">
                                <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                                <CardDescription className="text-xs line-clamp-2">{task.description}</CardDescription>
                              </CardHeader>
                              <CardFooter className="p-3 pt-0 flex justify-between items-center">
                                <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                                  {task.priority}
                                </Badge>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                  <Calendar className="h-3 w-3" />
                                  <span>{task.dueDate}</span>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="p-0" onClick={() => setSelectedTask(task)}>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Task</DialogTitle>
                                      <DialogDescription>Make changes to your task here.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">Title</Label>
                                        <Input id="title" value={selectedTask?.title} className="col-span-3" onChange={(e) => setSelectedTask({...selectedTask, title: e.target.value})} />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">Description</Label>
                                        <Textarea id="description" value={selectedTask?.description} className="col-span-3" onChange={(e) => setSelectedTask({...selectedTask, description: e.target.value})} />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="priority" className="text-right">Priority</Label>
                                        <Select value={selectedTask?.priority} onValueChange={(value) => setSelectedTask({...selectedTask, priority: value})}>
                                          <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select priority" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                                        <Input id="dueDate" type="date" value={selectedTask?.dueDate} className="col-span-3" onChange={(e) => setSelectedTask({...selectedTask, dueDate: e.target.value})} />
                                      </div>
                                    </div>
                                    <Button onClick={() => updateTask(selectedTask)}>Save Changes</Button>
                                  </DialogContent>
                                </Dialog>
                              </CardFooter>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => addTask(columnId)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Task
                </Button>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ImprovedProjectBoard;