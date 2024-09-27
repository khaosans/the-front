'use client';

import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, MoreHorizontal, Calendar, MessageSquare } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  comments: number
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Research competitors', description: 'Analyze top 5 competitors', priority: 'high', dueDate: '2023-06-30', comments: 2 },
      { id: '2', title: 'Design mockups', description: 'Create initial design concepts', priority: 'medium', dueDate: '2023-07-15', comments: 0 },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Develop MVP', description: 'Build core features of the product', priority: 'high', dueDate: '2023-08-01', comments: 5 },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '4', title: 'Project kickoff', description: 'Initial team meeting and project setup', priority: 'low', dueDate: '2023-06-01', comments: 1 },
    ],
  },
]

const TaskCard: React.FC<{ task: Task; index: number }> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="mb-2">
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">{task.description}</p>
              <div className="flex justify-between items-center">
                <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                  {task.priority}
                </Badge>
                <div className="flex items-center space-x-2">
                  {task.dueDate && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {task.dueDate}
                    </div>
                  )}
                  {task.comments > 0 && (
                    <div className="flex items-center text-xs text-gray-500">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {task.comments}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )
}

const Column: React.FC<{ column: Column; index: number }> = ({ column, index }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 p-4 rounded-lg w-80 flex-shrink-0"
        >
          <h3 className="font-bold mb-4 flex justify-between items-center">
            {column.title}
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </h3>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </ScrollArea>
          <Button variant="secondary" className="w-full mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add a card
          </Button>
        </div>
      )}
    </Droppable>
  )
}

export default function BoardPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceColumn = columns.find(col => col.id === source.droppableId)
    const destColumn = columns.find(col => col.id === destination.droppableId)
    const draggedTask = sourceColumn?.tasks.find(task => task.id === draggableId)

    if (!sourceColumn || !destColumn || !draggedTask) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      // Moving within the same column
      const newTasks = Array.from(sourceColumn.tasks)
      newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, draggedTask)

      const newColumn = {
        ...sourceColumn,
        tasks: newTasks,
      }

      setColumns(prevColumns =>
        prevColumns.map(col => (col.id === newColumn.id ? newColumn : col))
      )
    } else {
      // Moving to a different column
      const sourceTasks = Array.from(sourceColumn.tasks)
      sourceTasks.splice(source.index, 1)
      const newSourceColumn = {
        ...sourceColumn,
        tasks: sourceTasks,
      }

      const destTasks = Array.from(destColumn.tasks)
      destTasks.splice(destination.index, 0, draggedTask)
      const newDestColumn = {
        ...destColumn,
        tasks: destTasks,
      }

      setColumns(prevColumns =>
        prevColumns.map(col =>
          col.id === newSourceColumn.id
            ? newSourceColumn
            : col.id === newDestColumn.id
            ? newDestColumn
            : col
        )
      )
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Board</h1>
          <div className="flex space-x-2">
            <Input placeholder="Search tasks..." className="w-64" />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {columns.map((column, index) => (
            <Column key={column.id} column={column} index={index} />
          ))}
          <Button variant="secondary" className="h-[calc(100vh-160px)] w-80 flex-shrink-0">
            <PlusCircle className="mr-2 h-4 w-4" /> Add another list
          </Button>
        </div>
      </div>
    </DragDropContext>
  )
}
