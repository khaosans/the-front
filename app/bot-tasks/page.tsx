'use client';

import React, { useState } from 'react';

//use absolute imports
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';
import ChatbotModal from '@/components/ChatbotModal';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  dueDate: string;
  priority: string;
}

const BotTaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatSubmit = (message: string) => {
    // Simulate task creation from chatbot input
    const newTask: Task = {
      id: Date.now(),
      title: message,
      completed: false,
      category: 'General',
      dueDate: '',
      priority: 'Medium',
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <RobotTransformerWallpaper />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Bot Task Manager</h1>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Task Management Bot</h2>
          <p className="mb-4">
            Use the chatbot to manage your tasks. You can add new tasks, update existing ones, and track your progress through a conversational interface.
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Task List</h2>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <span
                    className={`block ${task.completed ? 'line-through text-gray-500' : ''}`}
                  >
                    {task.title}
                  </span>
                  <small className="text-gray-400">
                    {task.category} | Due: {task.dueDate} | Priority: {task.priority}
                  </small>
                </div>
                <button
                  onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                  className={`ml-2 ${task.completed ? 'bg-green-500' : 'bg-red-500'} hover:bg-opacity-75 text-white py-1 px-2 rounded`}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default BotTaskManager;