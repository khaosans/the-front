'use client';

import React from 'react';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    comments: number;
}

interface TaskCardProps {
    task: Task;
    columnId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, columnId }) => {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {/* Add more task details as needed */}
        </div>
    );
};

export default TaskCard;