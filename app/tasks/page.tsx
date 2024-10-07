'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react'; // Import icons
import SharedLayout from '@/components/SharedLayout';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  dueDate: string;
  priority: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        completed: false,
        category,
        dueDate,
        priority,
      }]);
      setNewTask('');
      setDueDate('');
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <SharedLayout>
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <Link href="/another-page">
          <a className="text-blue-400 hover:underline">Go to Another Page</a>
        </Link>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 bg-gray-800 text-white rounded mb-2"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div className="flex space-x-2 mb-2">
            <select
              className="p-2 bg-gray-800 text-white rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Work</option>
              <option>Personal</option>
            </select>
            <input
              type="date"
              className="p-2 bg-gray-800 text-white rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <select
              className="p-2 bg-gray-800 text-white rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-purple-700 to-blue-800 hover:from-purple-800 hover:to-blue-900 text-white py-2 px-4 rounded"
          >
            Add Task
          </button>
        </div>
        <ul>
          {tasks.map((task: Task) => (
            <li key={task.id} className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-lg">
              <div className="flex-1">
                <span
                  className={`block ${task.completed ? 'line-through text-gray-500' : ''}`}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.title}
                </span>
                <small className="text-gray-400">
                  {task.category} | Due: {task.dueDate} | Priority: {task.priority}
                </small>
              </div>
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`ml-2 ${task.completed ? 'bg-green-500' : 'bg-red-500'} hover:bg-opacity-75 text-white py-1 px-2 rounded`}
              >
                {task.completed ? <CheckCircle size={16} /> : <XCircle size={16} />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </SharedLayout>
  );
};

export default TaskManager;