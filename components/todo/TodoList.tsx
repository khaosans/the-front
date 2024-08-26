'use client';

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const supabase = createClientComponentClient();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching todos:', error);
            return;
        }

        if (data) {
            setTodos(data);
        }
    };

    const addTodo = async () => {
        if (newTodo.trim() === '') return;
        
        const { data, error } = await supabase
            .from('todos')
            .insert({ text: newTodo, completed: false })
            .select();

        if (error) {
            console.error('Error adding todo:', error);
            return;
        }

        if (data && data.length > 0) {
            setTodos([...todos, data[0]]);
            setNewTodo('');
        }
    };

    const toggleTodo = async (id: number) => {
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (!todoToUpdate) return;

        const { data, error } = await supabase
            .from('todos')
            .update({ completed: !todoToUpdate.completed })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error toggling todo:', error);
            return;
        }

        if (data && data.length > 0) {
            setTodos(todos.map(todo => todo.id === id ? data[0] : todo));
        }
    };

    const removeTodo = async (id: number) => {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error removing todo:', error);
            return;
        }

        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Todo List</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="flex-1 p-2 border rounded text-gray-900 placeholder-gray-400"
                    placeholder="Add a new todo"
                />
                <button onClick={addTodo} className="ml-2 p-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <div className="space-y-4">
                {todos.map(todo => (
                    <div key={todo.id} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                        <span 
                            onClick={() => toggleTodo(todo.id)} 
                            className={`cursor-pointer text-white flex-grow ${todo.completed ? 'line-through' : ''}`}
                        >
                            {todo.text}
                        </span>
                        <button 
                            onClick={() => removeTodo(todo.id)} 
                            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;