'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from 'lucide-react'

interface Task {
  id: string
  title: string
  status: 'todo' | 'inprogress' | 'done'
  project: string
}

interface Project {
  id: string
  name: string
  description: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
}

// Mock data
const mockTasks: Task[] = [
  { id: '1', title: 'Task 1', status: 'todo', project: 'Project A' },
  { id: '2', title: 'Task 2', status: 'inprogress', project: 'Project B' },
  { id: '3', title: 'Task 3', status: 'done', project: 'Project C' },
]

const mockProjects: Project[] = [
  { id: '1', name: 'Project A', description: 'Description of Project A' },
  { id: '2', name: 'Project B', description: 'Description of Project B' },
  { id: '3', name: 'Project C', description: 'Description of Project C' },
]

const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'John Doe', role: 'Developer', avatar: '/avatars/john.jpg' },
  { id: '2', name: 'Jane Smith', role: 'Designer', avatar: '/avatars/jane.jpg' },
  { id: '3', name: 'Bob Johnson', role: 'Manager', avatar: '/avatars/bob.jpg' },
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTasks(mockTasks)
      setProjects(mockProjects)
      setTeamMembers(mockTeamMembers)
      setIsLoading(false)
    }, 500)
  }

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.project.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="flex space-x-2 mb-6">
        <Input 
          placeholder="Search tasks, projects, or team members..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="flex justify-between items-center mb-4 p-2 bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">Project: {task.project}</p>
                    </div>
                    <Badge 
                      variant={task.status === 'todo' ? 'default' : task.status === 'inprogress' ? 'secondary' : 'outline'}
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="mb-4 p-4 bg-secondary rounded-lg">
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {filteredTeamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}