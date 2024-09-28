"use client"
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-select';
import { Input } from 'postcss';
import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import DialogFooter from './ui/dialog-footer';
import {TaskItem} from "@/components/Task";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskItem | null;
  onSave: (updatedTask: TaskItem) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task, onSave }) => {
  const [editedTask, setEditedTask] = useState<TaskItem | null>(task);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedTask) {
      setEditedTask(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="text-lg font-bold mb-4">Edit Task</div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">Title</label>
            <input
              id="title"
              name="title"
              value={editedTask?.title || ''}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedTask?.description || ''}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <DialogFooter className="mt-4">
            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
