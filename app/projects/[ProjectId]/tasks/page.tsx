'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  description: string
  due_date: string
  status: 'todo' | 'inprogress' | 'done'
  project_id: string
}

// Mock data
const mockTasks: Task[] = [
  { id: '1', title: 'Task 1', description: 'Description 1', due_date: '2023-05-01', status: 'todo', project_id: 'project1' },
  { id: '2', title: 'Task 2', description: 'Description 2', due_date: '2023-05-02', status: 'inprogress', project_id: 'project1' },
  { id: '3', title: 'Task 3', description: 'Description 3', due_date: '2023-05-03', status: 'done', project_id: 'project1' },
]

export default function ProjectTasksPage() {
  const { projectId } = useParams()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [projectId])

  async function fetchTasks() {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTasks(mockTasks.filter(task => task.project_id === projectId))
      setIsLoading(false)
    }, 500)
  }

  const handleAddEditTask = async (task: Omit<Task, 'id'>) => {
    if (currentTask?.id) {
      // Update existing task
      setTasks(tasks.map(t => t.id === currentTask.id ? { ...t, ...task } : t))
    } else {
      // Add new task
      const newTask = { ...task, id: Date.now().toString(), project_id: projectId as string }
      setTasks([...tasks, newTask])
    }
    setIsDialogOpen(false)
    setCurrentTask(null)
  }

  const handleDeleteTask = async (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div>Loading tasks...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Project Tasks</h1>
      <div className="flex justify-between items-center mb-6">
        <Input 
          className="w-64" 
          placeholder="Search tasks..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {filteredTasks.map(task => (
          <Card key={task.id} className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {task.title}
                <Badge 
                  variant={task.status === 'todo' ? 'default' : task.status === 'inprogress' ? 'secondary' : 'outline'}
                  className="ml-2"
                >
                  {task.status}
                </Badge>
              </CardTitle>
              <div>
                <Button variant="ghost" size="sm" onClick={() => { setCurrentTask(task); setIsDialogOpen(true); }}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              <p className="text-sm text-muted-foreground mt-2">Due: {task.due_date}</p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const task = {
              title: formData.get('title') as string,
              description: formData.get('description') as string,
              due_date: formData.get('due_date') as string,
              status: formData.get('status') as 'todo' | 'inprogress' | 'done',
              project_id: projectId as string,
            }
            handleAddEditTask(task)
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={currentTask?.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={currentTask?.description} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="due_date">Due Date</Label>
                <Input id="due_date" name="due_date" type="date" defaultValue={currentTask?.due_date} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" defaultValue={currentTask?.status} className="col-span-3">
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{currentTask ? 'Save Changes' : 'Add Task'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}