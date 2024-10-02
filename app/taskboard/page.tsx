"use client"

import React, { useState, useEffect } from 'react';
import CenteredAtomSpinner from "@/components/CenteredAtomSpinner"; // Import the spinner
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle } from 'lucide-react';
import TaskCard from "@/components/TaskCard"; // Import TaskCard component
import { Label } from '@/components/ui/label';
import { Task } from '@/lib/task';



interface Column {
    id: string;
    title: string;
    tasks: Task[];
}

const initialColumns: Column[] = [
    {
        id: 'todo',
        title: 'To Do',
        tasks: [
            { id: '1', title: 'Research competitors', description: 'Analyze top 5 competitors', priority: 'high', dueDate: '2023-06-30', comments: ['comment1', 'comment2'], status: 'todo' },      
            { id: '2', title: 'Design mockups', description: 'Create initial design concepts', priority: 'medium', dueDate: '2023-07-15', comments: ['comment1', 'comment2'], status: 'todo' },
            { id: '3', title: 'Develop MVP', description: 'Build core features of the product', priority: 'high', dueDate: '2023-08-01', comments: ['comment1', 'comment2'], status: 'todo' },
        ],
    },
    {
        id: 'inprogress',
        title: 'In Progress',
        tasks: [
            { id: '3', title: 'Develop MVP', description: 'Build core features of the product', priority: 'high', dueDate: '2023-08-01', comments: ['comment1', 'comment2'], status: 'inprogress' },
        ],
    },
    {
        id: 'done',
        title: 'Done',
        tasks: [
            { id: '4', title: 'Project kickoff', description: 'Initial team meeting and project setup', priority: 'low', dueDate: '2023-06-01', comments: ['comment1', 'comment2'], status: 'done' },
        ],
    },
];

const Taskboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
    const [newTask, setNewTask] = useState<Task | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate loading for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <CenteredAtomSpinner />;
    }

    const moveTask = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
        setColumns((prevColumns) => {
            const newColumns = prevColumns.map((column) => ({ ...column, tasks: [...column.tasks] }));
            const sourceColumn = newColumns.find((col) => col.id === sourceColumnId);
            const targetColumn = newColumns.find((col) => col.id === targetColumnId);
            const taskToMove = sourceColumn?.tasks.find((task) => task.id === taskId);

            if (sourceColumn && targetColumn && taskToMove) {
                sourceColumn.tasks = sourceColumn.tasks.filter((task) => task.id !== taskId);
                targetColumn.tasks.push(taskToMove);
            }

            return newColumns;
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Task Board</h1>
                    <Button onClick={() => setIsNewTaskDialogOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Task
                    </Button>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {columns.map((column) => (
                        <div key={column.id} className="bg-gray-100 p-4 rounded-lg w-80 flex-shrink-0">
                            <h3 className="font-bold mb-4">{column.title}</h3>
                            <div className="h-[calc(100vh-200px)] overflow-y-auto">
                                {column.tasks.map((task) => (
                                    <TaskCard key={task.id} task={task} onEdit={function (task: Task): void {
                                        throw new Error('Function not implemented.');
                                    } } />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        // Handle task creation logic here
                    }}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="task-title" className="text-right">Title</Label>
                                <Input id="task-title" name="title" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="task-project" className="text-right">Project</Label>
                                <Input id="task-project" name="project" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="task-due-date" className="text-right">Due Date</Label>
                                <Input id="task-due-date" name="dueDate" type="date" className="col-span-3" required />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Create Task</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </DndProvider>
    );
};

export default Taskboard;