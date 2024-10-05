'use client';

import React, { useState } from 'react';
import RobotTransformerWallpaper from '../../components/RobotTransformerWallpaper';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  dueDate: string;
  priority: string;
  assignedTo: string;
  estimatedTime: string;
  dependencies: string[];
}

const AgentTaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Implement new UI component", completed: false, category: 'Frontend', dueDate: '', priority: 'High', assignedTo: 'Alice', estimatedTime: '3h', dependencies: [] },
    { id: 2, title: "Optimize database queries", completed: false, category: 'Backend', dueDate: '', priority: 'Medium', assignedTo: 'Bob', estimatedTime: '2h', dependencies: ['Task 1'] },
    // Add more default tasks here
  ]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [dependencies, setDependencies] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        completed: false,
        category,
        dueDate,
        priority,
        assignedTo,
        estimatedTime,
        dependencies: dependencies.split(',').map(dep => dep.trim()),
      }]);
      setNewTask('');
      setDueDate('');
      setAssignedTo('');
      setEstimatedTime('');
      setDependencies('');
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <RobotTransformerWallpaper />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Agent Task Manager</h1>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Background Story</h2>
          <p className="mb-4">
            Welcome to the Agent Task Manager. This tool is designed to help agents efficiently manage their tasks across various domains such as Frontend, Backend, DevOps, QA Automation, UAT, and Product Management. By organizing tasks and setting priorities, agents can streamline their workflow and achieve their goals effectively.
          </p>
          <h2 className="text-xl font-semibold mb-2">Expected Output</h2>
          <p>
            The expected outcome is a well-organized task list that allows agents to track progress, meet deadlines, and ensure high-quality deliverables. By using this task manager, agents can enhance productivity and collaboration within their teams.
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 bg-gray-700 text-white rounded mb-2"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className="flex space-x-2 mb-2">
              <select
                className="p-2 bg-gray-700 text-white rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Frontend</option>
                <option>Backend</option>
                <option>DevOps</option>
                <option>QA Automation</option>
                <option>UAT</option>
                <option>Product</option>
              </select>
              <input
                type="date"
                className="p-2 bg-gray-700 text-white rounded"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <select
                className="p-2 bg-gray-700 text-white rounded"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 text-white rounded mb-2"
              placeholder="Assigned to"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 bg-gray-700 text-white rounded mb-2"
              placeholder="Estimated time (e.g., 2h)"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 bg-gray-700 text-white rounded mb-2"
              placeholder="Dependencies (comma-separated)"
              value={dependencies}
              onChange={(e) => setDependencies(e.target.value)}
            />
            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add Task
            </button>
          </div>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <span
                    className={`block ${task.completed ? 'line-through text-gray-500' : ''}`}
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    {task.title}
                  </span>
                  <small className="text-gray-400">
                    {task.category} | Due: {task.dueDate} | Priority: {task.priority} | Assigned to: {task.assignedTo} | Estimated time: {task.estimatedTime} | Dependencies: {task.dependencies.join(', ')}
                  </small>
                </div>
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`ml-2 ${task.completed ? 'bg-green-500' : 'bg-red-500'} hover:bg-opacity-75 text-white py-1 px-2 rounded`}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentTaskManager;