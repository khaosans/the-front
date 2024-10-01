'use client'

import React, { useState, useEffect } from 'react'
import { mockClient, Project } from '@/lib/mockClient'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { PlusCircle, Search, Calendar, Users, BarChart } from 'lucide-react'
import Spinner from '@/app/components/Spinner'

interface Project {
  id: string
  name: string
  description: string
  progress: number
  startDate: string
  endDate: string
  teamId: string
}

const getProgressColor = (progress: number) => {
  if (progress < 30) return 'bg-red-500';
  if (progress < 70) return 'bg-yellow-500';
  return 'bg-green-500';
};

const ProjectCard: React.FC<{ project: Project; isLoading: boolean }> = ({ project, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="hover:shadow-lg transition-shadow h-48 flex justify-center items-center">
        <Spinner />
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-xs">{project.startDate} - {project.endDate}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-xs">Team {project.teamId}</span>
          </div>
        </div>
        <div className="flex items-center">
          <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
          <div className="flex-1 bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${getProgressColor(project.progress)}`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs font-medium">{project.progress}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      try {
        const fetchedProjects = await mockClient.fetchProjects()
        setProjects(fetchedProjects)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleCreateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      progress: 0,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      teamId: formData.get('teamId') as string,
    }
    setProjects([...projects, newProject])
    setIsCreateDialogOpen(false)
    toast({
      title: "Success",
      description: "Project created successfully.",
    })
  }

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <Spinner />

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="pl-8" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} isLoading={isLoading} />
          ))}
        </div>
      </ScrollArea>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateProject}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input id="description" name="description" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">End Date</Label>
                <Input id="endDate" name="endDate" type="date" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teamId" className="text-right">Team ID</Label>
                <Input id="teamId" name="teamId" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectsPage