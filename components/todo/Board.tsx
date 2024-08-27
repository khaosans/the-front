'use client'

import { useState, useEffect } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from './Board.module.css'

// Update the Todo interface to match your table structure
export interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  user_id: string;
}

const Board = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id')
    if (error) console.log('error', error)
    else setTodos(data)
  }

  const onDragEnd = (result: any) => {
    // Implement drag and drop logic here
  }

  const addTodo = async (status: string) => {
    const newTodo = {
      title: 'New Task',
      description: 'Task description',
      status: status,
      user_id: (await supabase.auth.getUser()).data.user?.id
    }
    const { data, error } = await supabase
      .from('todos')
      .insert([newTodo])
      .select()
    if (error) console.log('error', error)
    else if (data) setTodos([...todos, data[0]])
  }

  const columns = ['TODO', 'IN_PROGRESS', 'DONE']

  return (
    <div className={styles.boardContainer}>
      <h1 className={styles.boardTitle}>Task Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.columnsContainer}>
          {columns.map(column => (
            <div key={column} className={styles.column}>
              <h2 className={styles.columnTitle}>{column.replace('_', ' ')}</h2>
              <Droppable droppableId={column}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.taskList}
                  >
                    {todos
                      .filter(todo => todo.status === column)
                      .map((todo, index) => (
                        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.task}
                            >
                              <div className={styles.taskTitle}>{todo.title}</div>
                              <div className={styles.taskDescription}>{todo.description}</div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div className={styles.addTaskForm}>
                <button
                  className={styles.addTaskButton}
                  onClick={() => addTodo(column)}
                >
                  Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default Board