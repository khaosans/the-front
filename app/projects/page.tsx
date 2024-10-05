'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Briefcase, Plus, Search } from 'lucide-react';
import { toast } from "react-hot-toast";
import DynamicWallpaper from '@/components/dynamic-wallpaper';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
}

const projects: Project[] = [
  { id: '1', name: 'Website Redesign', description: 'Revamping the company website', status: 'In Progress' },
  { id: '2', name: 'Mobile App Development', description: 'Creating a new mobile app', status: 'Planning' },
  { id: '3', name: 'Database Migration', description: 'Upgrading to a new database system', status: 'Completed' },
  { id: '4', name: 'AI Integration', description: 'Implementing AI features', status: 'In Progress' },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleCreateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add project creation logic here
    setIsCreateDialogOpen(false);
    toast.success("Project created successfully.");
  };

  return (
    <>
      <DynamicWallpaper primaryColor="purple" secondaryColor="indigo" />
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Projects</h1>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-400">
                    <Briefcase className="mr-2 h-6 w-6" />
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-2">{project.description}</p>
                  <p className="text-sm text-gray-400">Status: {project.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateProject}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">Name</label>
                    <Input id="name" name="name" className="col-span-3 bg-gray-700 border-gray-600 text-white" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="text-right">Description</label>
                    <Input id="description" name="description" className="col-span-3 bg-gray-700 border-gray-600 text-white" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create Project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}