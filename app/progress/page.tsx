'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Project {
  id: string
  name: string
  progress: number
  tasksCompleted: number
  totalTasks: number
}

export default function ProgressPage() {
  const [projects] = useState<Project[]>([
    { id: '1', name: 'Project Alpha', progress: 65, tasksCompleted: 13, totalTasks: 20 },
    { id: '2', name: 'Project Beta', progress: 30, tasksCompleted: 6, totalTasks: 20 },
    { id: '3', name: 'Project Gamma', progress: 90, tasksCompleted: 18, totalTasks: 20 },
    { id: '4', name: 'Project Delta', progress: 45, tasksCompleted: 9, totalTasks: 20 },
    { id: '5', name: 'Project Epsilon', progress: 10, tasksCompleted: 2, totalTasks: 20 },
  ])

  const chartData = projects.map(project => ({
    name: project.name,
    progress: project.progress,
  }))

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Project Progress Overview</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {projects.map((project) => (
              <div key={project.id} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <Badge variant={project.progress < 30 ? 'destructive' : project.progress < 70 ? 'default' : 'secondary'}>
                    {project.progress}%
                  </Badge>
                </div>
                <Progress value={project.progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Tasks completed: {project.tasksCompleted} / {project.totalTasks}
                </p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}