'use client';

import React from 'react';
import { Task, Agent } from '@/types';

interface TaskDetailViewProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
  agents: Agent[];
  params: { taskId: string };
}

const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, isOpen, onClose, onUpdate, agents }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <button onClick={() => onUpdate({ ...task, status: 'Completed' })}>Complete Task</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskDetailView;
