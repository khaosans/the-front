'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Search, Folder, Calendar, Users } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  dueDate: string
  memberCount: number
  boardCount: number
}

export default function ProjectsPage() {
  const params = useParams()
  const teamId = params.TeamId as string

  const [team, setTeam] = useState({ id: teamId, name: 'Design Team' })
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Website Redesign', description: 'Overhaul of the company website', dueDate: '2023-12-31', memberCount: 5, boardCount: 3 },
    { id: '2', name: 'Mobile App UI', description: 'Design for the new mobile application', dueDate: '2023-10-15', memberCount: 4, boardCount: 2 },
    { id: '3', name: 'Brand Refresh', description: 'Updating company branding assets', dueDate: '2023-11-30', memberCount: 3, boardCount: 1 },
  ])

  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Fetch team details and projects here
    // This is where you'd make API calls to get the actual data
  }, [teamId])

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
      memberCount: 0,
      boardCount: 0,
    }
    setProjects([...projects, newProject])
    setIsAddProjectDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{team.name} - Projects</h1>
        <Button onClick={() => setIsAddProjectDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Project
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

      <Card>
        <CardHeader>
          <CardTitle>Team Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            {filteredProjects.map((project) => (
              <Link href={`/teams/${teamId}/projects/${project.id}`} key={project.id}>
                <div className="flex items-center space-x-4 mb-4 p-4 rounded-lg hover:bg-accent">
                  <Folder className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.memberCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Folder className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.boardCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProject}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" name="description" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}