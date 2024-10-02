'use client'

import React, { useState, useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, MoreHorizontal, Calendar, MessageSquare } from 'lucide-react'
import { EditTaskModal } from "@/app/taskboard/edit-task-modal"
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card-content'
import { CardHeader } from '@/components/ui/card-header'
import { CardTitle } from '@/components/ui/card-title'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import CenteredAtomSpinner from "@/components/CenteredAtomSpinner";
import { Task } from "@/lib/task";
import { mockClient } from '@/lib/dataProvider'
import { Taskboard } from '@/lib/taskboard'

interface Column {
  id: string
  title: string
  taskIds: string[]
}

const TaskCard: React.FC<{ task: Task; columnId: string; onEdit: (task: Task) => void; isLoading: boolean }> = ({ task, columnId, onEdit, isLoading }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  }

  if (isLoading) {
    return (
        <Card className="mb-2 p-4 flex justify-center items-center">
          <CenteredAtomSpinner />
        </Card>
    );
  }

  return (
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Card className="mb-2 cursor-move hover:shadow-md transition-shadow" onClick={() => onEdit(task)}>
          <CardHeader className="p-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                <span className="text-xs font-semibold">{task.priority}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{task.description}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)} bg-opacity-10`}>
                {task.status}
              </Badge>
              {task.dueDate && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
              )}
              {task.comments.length > 0 && (
                  <div className="flex items-center text-xs text-gray-500">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {task.comments}
                  </div>
              )}
              {task.assignee && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Avatar className="w-4 h-4 mr-1">
                      <AvatarImage src={`https://avatar.vercel.sh/${task.assignee}.png`} alt={task.assignee} />
                      <AvatarFallback>{task.assignee[0]}</AvatarFallback>
                    </Avatar>
                    {task.assignee}
                  </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

const Column: React.FC<{ column: Column; tasks: Task[]; moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string) => void; onEditTask: (task: Task) => void; isLoading: boolean }> = ({ column, tasks, moveTask, onEditTask, isLoading }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string; columnId: string }) => {
      if (item.columnId !== column.id) {
        moveTask(item.id, item.columnId, column.id)
      }
    },
  })

  return (
      <div ref={drop} className="bg-gray-100 p-4 rounded-lg w-80 flex-shrink-0">
        <h3 className="font-bold mb-4 flex justify-between items-center">
          {column.title}
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </h3>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {column.taskIds.map((taskId) => {
            const task = tasks.find(t => t.id === taskId)
            if (task) {
              return <TaskCard key={task.id} task={task} columnId={column.id} onEdit={onEditTask} isLoading={isLoading} />
            }
            return null
          })}
        </ScrollArea>
        <Button variant="outline" className="w-full mt-4">
          <PlusCircle className="mr-2 h-4 w-4" /> Add a card
        </Button>
      </div>
  )
}

export default function Board() {
  const [taskboard, setTaskboard] = useState<Taskboard | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const fetchedTaskboards = await mockClient.fetchTaskboards()
        const fetchedTasks = await mockClient.fetchTasks()
        setTaskboard(fetchedTaskboards[0]) // Assuming we're using the first taskboard
        setTasks(fetchedTasks as Task[])
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const moveTask = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    if (taskboard) {
      const newColumns = taskboard.columns.map((column: any) => {
        if (column.id === sourceColumnId) {
          return { ...column, taskIds: column.taskIds.filter((id: string) => id !== taskId) }
        }
        if (column.id === targetColumnId) {
          return { ...column, taskIds: [...column.taskIds, taskId] }
        }
        return column
      })
      setTaskboard({ ...taskboard, columns: newColumns })
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleSaveTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setEditingTask(null)
  }

  if (isLoading) return <CenteredAtomSpinner />
  if (!taskboard) return <div>No taskboard found</div>

  return (
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{taskboard.name}</h1>
              <div className="flex space-x-2">
                <Input className="w-64" placeholder="Search tasks..." />
                <Button>Filter</Button>
              </div>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {taskboard.columns.map((column: any) => (
                  <Column key={column.id} column={column} tasks={tasks} moveTask={moveTask} onEditTask={handleEditTask} isLoading={isLoading} />
              ))}
              <Button variant="outline" className="h-[calc(100vh-160px)] w-80 flex-shrink-0">
                <PlusCircle className="mr-2 h-4 w-4" /> Add another list
              </Button>
            </div>
          </main>

          {editingTask && (
              <EditTaskModal
                  task={editingTask}
                  isOpen={!!editingTask}
                  onClose={() => setEditingTask(null)}
                  onSave={handleSaveTask}
              />
          )}
        </div>
      </DndProvider>
  )
}
