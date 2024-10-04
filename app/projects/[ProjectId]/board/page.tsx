'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  content: string
  status: 'To Do' | 'In Progress' | 'Done'
  priority: 'Low' | 'Medium' | 'High'
}

const initialTasks: Task[] = [
  { id: 'task-1', content: 'Design user interface', status: 'To Do', priority: 'High' },
  { id: 'task-2', content: 'Implement authentication', status: 'In Progress', priority: 'Medium' },
  { id: 'task-3', content: 'Set up database', status: 'Done', priority: 'High' },
  { id: 'task-4', content: 'Create API endpoints', status: 'To Do', priority: 'Medium' },
  { id: 'task-5', content: 'Write unit tests', status: 'In Progress', priority: 'Low' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'To Do':
      return 'bg-blue-100 border-blue-300';
    case 'In Progress':
      return 'bg-yellow-100 border-yellow-300';
    case 'Done':
      return 'bg-green-100 border-green-300';
    default:
      return 'bg-gray-100 border-gray-300';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Low':
      return 'bg-green-200 text-green-800';
    case 'Medium':
      return 'bg-yellow-200 text-yellow-800';
    case 'High':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export default function ProjectBoard() {
  const params = useParams()
  const projectId = params.projectId
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newTasks = Array.from(tasks)
    const [reorderedItem] = newTasks.splice(result.source.index, 1)
    reorderedItem.status = result.destination.droppableId as 'To Do' | 'In Progress' | 'Done'
    newTasks.splice(result.destination.index, 0, reorderedItem)

    setTasks(newTasks)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Project Board</h1>
      <p className="mb-4 text-gray-600">Project ID: {projectId}</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {['To Do', 'In Progress', 'Done'].map((status) => (
            <Card key={status} className={`${getStatusColor(status)} border-t-4`}>
              <CardHeader>
                <CardTitle className="font-bold text-lg">{status}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {tasks.filter(task => task.status === status).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{task.content}</span>
                                <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                                  {task.priority}
                                </Badge>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}