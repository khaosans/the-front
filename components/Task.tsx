'use client';

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    comments: string[];
    status?: 'pending' | 'in-progress' | 'completed'; // Added status property
    assignee?: string;
    project_id: string; // Ensure this is included
}
