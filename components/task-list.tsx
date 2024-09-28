"use client"

import React, { useState } from 'react';
import {Task} from "@/components/Task";
import {EditTaskModal} from "@/app/taskboard/edit-task-modal";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSave = (updatedTask: Task) => {
    // Logic to save the updated task (e.g., API call)
    console.log('Updated Task:', updatedTask);
    handleModalClose();
  };

  return (
      <div>
        {tasks.map(task => (
            <div key={task.id} onClick={() => handleTaskClick(task)}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {/* Add more task details as needed */}
            </div>
        ))}
        {selectedTask && (
            <EditTaskModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                task={selectedTask}
                onSave={handleSave} // Updated to pass the handleSave function
            />
        )}
      </div>
  );
};

export default TaskList;
