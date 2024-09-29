'use client';

import React from 'react';

interface Task {
    id: string;
    title?: string;
    description?: string;
    status?: string;
    // Add other properties as needed
}

interface TaskCardProps {
    task?: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    if (!task) {
        return null; // or return a placeholder component
    }

    return (
        <div className="task-card">
            <h3>{task.title || 'Untitled Task'}</h3>
            <p>{task.description || 'No description'}</p>
            <span>{task.status || 'No status'}</span>
        </div>
    );
};

export default TaskCard;