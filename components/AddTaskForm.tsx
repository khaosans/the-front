'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface Task {
    id: number;
    title: string;
    list_id: number;
}

interface AddTaskFormProps {
    onAddTask: (task: Task) => void;
    currentBoardId?: number;
}

export default function AddTaskForm({ onAddTask, currentBoardId }: AddTaskFormProps) {
    const [title, setTitle] = useState('');
    const supabase = createClientComponentClient();

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const { data, error } = await supabase
            .from('cards')
            .insert({ title, list_id: currentBoardId })
            .select();

        if (error) {
            console.error('Error adding task:', error.message, error.details, error.hint);
        } else if (data) {
            onAddTask(data[0]);
            setTitle('');
        }
    };

    const updateTask = async (id: number, updates: Partial<Task>) => {
        const { error } = await supabase
            .from('cards')
            .update(updates)
            .eq('id', id);

        if (error) console.error('Error updating task:', error);
    };

    const deleteTask = async (id: number) => {
        const { error } = await supabase
            .from('cards')
            .delete()
            .eq('id', id);

        if (error) console.error('Error deleting task:', error);
    };

    return (
        <form onSubmit={addTask} className="mb-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new task"
                className="p-2 border rounded mr-2"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Add Task
            </button>
        </form>
    );
}