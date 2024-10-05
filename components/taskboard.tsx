'use client';

import React from 'react';
import { Task } from './TaskManager'; // Import the Task interface

interface TaskBoardProps {
    tasks: Task[];
    onTaskUpdate: (updatedTask: Task) => void; // Function to handle task updates
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onTaskUpdate }) => {
    const statuses = ['To Do', 'In Progress', 'Done'];

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
        const taskId = e.dataTransfer.getData('text/plain');
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            onTaskUpdate({ ...task, status }); // Update the task status
        }
    };

    return (
        <div className="flex space-x-4 p-4">
            {statuses.map(status => (
                <div
                    key={status}
                    className="bg-gray-200 rounded-lg p-4 w-1/4"
                    onDrop={(e) => handleDrop(e, status)}
                    onDragOver={(e) => e.preventDefault()} // Allow drop
                >
                    <h2 className="font-bold text-lg mb-2">{status}</h2>
                    <div>
                        {tasks
                            .filter(task => task.status === status)
                            .map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
                                    className="bg-white rounded p-2 mb-2 shadow"
                                >
                                    {task.title}
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskBoard;