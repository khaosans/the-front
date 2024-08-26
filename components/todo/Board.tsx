'use client'

import { useState, useEffect } from "react"
import TodoComponent from "./Todo"
import { Todo } from "./types/todo"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Board() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    const loadTodos = async () => {
      const { data: fetchedTodos, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })
      if (fetchedTodos) {
        setTodos(fetchedTodos)
      }
      if (error) {
        console.error('Error fetching todos:', error)
      }
    }
    loadTodos()
  }, [supabase])

  const handleAddTodo = async () => {
    if (newTodoTitle.trim() !== "") {
      const { data: newTodo, error } = await supabase
        .from('todos')
        .insert({ title: newTodoTitle, completed: false })
        .select()
        .single()
      if (newTodo) {
        setTodos([newTodo, ...todos])
        setNewTodoTitle("")
      }
      if (error) {
        console.error('Error adding todo:', error)
      }
    }
  }

  const handleToggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id)
      if (!error) {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
      } else {
        console.error('Error updating todo:', error)
      }
    }
  }

  const handleDeleteTodo = async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
    if (!error) {
      setTodos(todos.filter(t => t.id !== id))
    } else {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="flex-grow p-2 border rounded-l bg-gray-800 text-white border-gray-700"
          placeholder="Add a new todo"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoComponent
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggleTodo(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  )
}
