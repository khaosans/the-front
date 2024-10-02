'use client';

import { Task } from '@/lib/task';
import React from 'react';

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            {task.dueDate && <p>Due Date: {task.dueDate}</p>}
            <div>
                {task.comments.map((comment, index) => (
                    <p key={index}>{comment}</p>
                ))}
            </div>
        </div>
    );
};

export default TaskCard;