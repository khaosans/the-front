'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useRouter } from 'next/navigation'
import styles from './taskboard.module.css'

interface Task {
  id: string
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
}

const COLUMNS = ['TODO', 'IN_PROGRESS', 'DONE']

export default function Taskboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        fetchTasks()
      } else {
        router.push('/login') // Redirect to login page if not authenticated
      }
      setLoading(false)
    }
    checkUser()
  }, [supabase, router])

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching tasks:', error)
    } else {
      setTasks(data || [])
    }
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask = {
      title: newTaskTitle.trim(),
      status: 'TODO' as const,
      user_id: user.id // Associate task with the current user
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([newTask])
      .select()

    if (error) {
      console.error('Error adding task:', error)
    } else if (data) {
      setTasks([...tasks, data[0]])
      setNewTaskTitle('')
    }
  }

  async function updateTaskStatus(taskId: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId)
      .eq('user_id', user.id) // Ensure user can only update their own tasks

    if (error) {
      console.error('Error updating task:', error)
    } else {
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
    }
  }

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const newStatus = destination.droppableId as 'TODO' | 'IN_PROGRESS' | 'DONE'
    await updateTaskStatus(draggableId, newStatus)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null // This should not happen as we redirect to login, but just in case
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        <h1>Task Board</h1>
        <p>Welcome, {user.email}</p>
        <button onClick={handleSignOut} className={styles.signOutButton}>Sign Out</button>
        <form onSubmit={addTask} className={styles.addTaskForm}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter new task"
            className={styles.addTaskInput}
          />
          <button type="submit" className={styles.addTaskButton}>Add Task</button>
        </form>
        <div className={styles.columns}>
          {COLUMNS.map(column => (
            <div key={column} className={styles.column}>
              <h2>{column}</h2>
              <Droppable droppableId={column}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`${styles.taskList} ${snapshot.isDraggingOver ? styles.draggingOver : ''}`}
                  >
                    {tasks
                      .filter(task => task.status === column)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${styles.task} ${snapshot.isDragging ? styles.dragging : ''}`}
                            >
                              <span>{task.title}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  )
}
