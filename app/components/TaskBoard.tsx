'use client';

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  position: number;
  board_id: string;
}

interface Column {
  id: string;
  name: string;
  position: number;
  board_id: string;
}

interface Board {
  id: string;
  name: string;
}

const TaskBoard: React.FC = () => {
  const [board, setBoard] = useState<Board | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newColumnName, setNewColumnName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [editingTasks, setEditingTasks] = useState<{ [key: string]: Task }>({});
  const [saveMessage, setSaveMessage] = useState<{ [key: string]: string }>({});
  const [saveFeedback, setSaveFeedback] = useState<{ [key: string]: string }>({});
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchOrCreateBoard();
  }, []);

  const fetchOrCreateBoard = async () => {
    try {
      let { data: boards, error } = await supabase
        .from('boards')
        .select('*')
        .limit(1);

      if (error) throw error;

      if (boards && boards.length > 0) {
        setBoard(boards[0]);
        await fetchColumns(boards[0].id);
        await fetchTasks(boards[0].id);
      } else {
        const { data, error } = await supabase
          .from('boards')
          .insert({ name: 'New Board' })
          .select()
          .single();

        if (error) throw error;

        setBoard(data);
        await fetchColumns(data.id);
      }
    } catch (error) {
      console.error('Error fetching or creating board:', error);
      setError('Failed to fetch or create board. Please try again.');
    }
  };

  const fetchColumns = async (boardId: string) => {
    try {
      const { data, error } = await supabase
        .from('columns')
        .select('*')
        .eq('board_id', boardId)
        .order('position');
      if (error) throw error;
      console.log('Fetched columns:', data); // Debug log
      setColumns(data || []);
    } catch (error) {
      console.error('Error fetching columns:', error);
      setError('Failed to fetch columns. Please try again.');
    }
  };

  const fetchTasks = async (boardId: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('board_id', boardId)
        .order('position');
      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please try again.');
    }
  };

  const addColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnName.trim() || !board) return;

    const newColumn = {
      name: newColumnName,
      position: columns.length,
      board_id: board.id,
    };

    try {
      const { data, error } = await supabase
        .from('columns')
        .insert(newColumn)
        .select()
        .single();

      if (error) throw error;

      setColumns([...columns, data]);
      setNewColumnName('');
      setIsAddingColumn(false); // Hide the input field after adding
      fetchTasks(board.id);
    } catch (error) {
      console.error('Error adding column:', error);
      setError('Failed to add column. Please try again.');
    }
  };

  const addTask = async (columnName: string) => {
    if (!board) return;

    const newTask = {
      title: "New Task",
      description: "",
      status: columnName,
      position: tasks.filter(t => t.status === columnName).length,
      board_id: board.id,
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert(newTask)
      .select()
      .single();

    if (error) {
      console.error('Error adding task:', error);
    } else if (data) {
      setTasks([...tasks, data]);
    }
  };

  const updateTask = async (taskId: string) => {
    const updatedTask = editingTasks[taskId];
    if (!updatedTask) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update(updatedTask)
        .eq('id', taskId);

      if (error) throw error;

      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      setEditingTasks(prev => {
        const newState = { ...prev };
        delete newState[taskId];
        return newState;
      });

      // Set success message
      setSaveMessage(prev => ({ ...prev, [taskId]: 'Saved successfully!' }));
      setSaveFeedback(prev => ({ ...prev, [taskId]: 'Saved successfully!' }));

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage(prev => {
          const newState = { ...prev };
          delete newState[taskId];
          return newState;
        });
      }, 3000);

    } catch (error) {
      console.error('Error updating task:', error);
      setSaveMessage(prev => ({ ...prev, [taskId]: 'Error saving. Please try again.' }));
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleInputChange = (task: Task, field: keyof Task, value: string) => {
    setEditingTasks(prev => ({
      ...prev,
      [task.id]: { ...task, [field]: value }
    }));
  };

  const deleteColumn = async (columnId: string) => {
    if (!board) return;

    try {
      const { error } = await supabase
        .from('columns')
        .delete()
        .eq('id', columnId);

      if (error) throw error;

      setColumns(columns.filter(c => c.id !== columnId));
      // Move tasks from deleted column to the first available column
      const firstColumn = columns.find(c => c.id !== columnId);
      if (firstColumn) {
        const updatedTasks = tasks.map(task => 
          task.status === columns.find(c => c.id === columnId)?.name
            ? { ...task, status: firstColumn.name }
            : task
        );
        setTasks(updatedTasks);
        // Update tasks in the database
        await Promise.all(updatedTasks.map(task => 
          supabase.from('tasks').update({ status: task.status }).eq('id', task.id)
        ));
      }
    } catch (error) {
      console.error('Error deleting column:', error);
      setError('Failed to delete column. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {error && <p className="text-red-500 mb-4 bg-red-100 p-3 rounded">{error}</p>}
      
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.length === 0 ? (
          <p className="text-gray-500 italic">No columns available. Add a column to get started.</p>
        ) : (
          columns.map((column, index) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className="bg-gray-200 rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-700">{column.name}</h2>
                  <div className="relative">
                    <button 
                      onClick={() => setOpenMenu(openMenu === column.id ? null : column.id)}
                      className="p-1 rounded-full hover:bg-gray-300 transition duration-150"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    {openMenu === column.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <button 
                          onClick={() => {
                            deleteColumn(column.id);
                            setOpenMenu(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition duration-150"
                        >
                          Delete Column
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  {tasks
                    .filter((task) => task.status === column.name)
                    .map((task) => (
                      <div key={task.id} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition duration-150">
                        <input
                          type="text"
                          value={editingTasks[task.id]?.title ?? task.title}
                          onChange={(e) => handleInputChange(task, 'title', e.target.value)}
                          className="w-full mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:border-blue-500 font-semibold focus:outline-none"
                        />
                        <textarea
                          value={editingTasks[task.id]?.description ?? task.description}
                          onChange={(e) => handleInputChange(task, 'description', e.target.value)}
                          className="w-full mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:border-blue-500 text-sm focus:outline-none resize-none"
                          rows={2}
                        />
                        <select
                          value={editingTasks[task.id]?.status ?? task.status}
                          onChange={(e) => handleInputChange(task, 'status', e.target.value)}
                          className="w-full mb-2 p-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {columns.map((column) => (
                            <option key={column.id} value={column.name}>{column.name}</option>
                          ))}
                        </select>
                        <div className="flex justify-between items-center mt-2">
                          <button 
                            onClick={() => updateTask(task.id)} 
                            className={`px-3 py-1 rounded text-sm font-medium transition duration-150 ${
                              editingTasks[task.id] 
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!editingTasks[task.id]}
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => deleteTask(task.id)} 
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition duration-150"
                          >
                            Delete
                          </button>
                        </div>
                        {saveMessage[task.id] && (
                          <p className={`mt-2 text-sm ${saveMessage[task.id].includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                            {saveMessage[task.id]}
                          </p>
                        )}
                      </div>
                    ))}
                  {index === 0 && (
                    <button 
                      onClick={() => addTask(column.name)}
                      className="w-full p-2 text-left text-gray-600 hover:bg-gray-300 rounded transition duration-150"
                    >
                      + Add a card
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Add Column button */}
        <div className="flex-shrink-0 w-80">
          <div className="bg-gray-200 rounded-lg shadow-md p-4">
            {isAddingColumn ? (
              <form onSubmit={addColumn} className="w-full">
                <input
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  placeholder="Enter list title..."
                  className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="flex items-center">
                  <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 transition duration-150">
                    Add List
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsAddingColumn(false)}
                    className="text-gray-500 hover:text-gray-700 transition duration-150"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button 
                onClick={() => setIsAddingColumn(true)}
                className="w-full p-2 text-left text-gray-600 hover:bg-gray-300 rounded transition duration-150"
              >
                + Add a List
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ... (keep the debug info section if needed) */}
    </div>
  );
};

export default TaskBoard;