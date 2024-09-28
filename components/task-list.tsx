"use client"

import React, { useState } from 'react';
import EditTaskModal from "@/components/EditTaskModal";
import { TaskItem } from "@/components/Task"; // Ensure this type is correctly defined

const TaskList = ({ tasks }: { tasks: TaskItem[] }) => {
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskClick = (task: TaskItem) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSave = (updatedTask: TaskItem) => {
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
