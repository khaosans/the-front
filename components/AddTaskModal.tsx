"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Textarea } from 'components/ui/textarea';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (task: { title: string; description: string; }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        if (title.trim() && description.trim()) {
            onAdd({ title, description });
            setTitle('');
            setDescription('');
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Task Title"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAddTask}>Add Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddTaskModal;