'use client'

import { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Folder, List } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card-content'
import { CardHeader } from '@/components/ui/card-header'
import { CardTitle } from '@/components/ui/card-title'

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
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-primary">TaskMaster</a>
            <div className="space-x-4">
              <a href="/login" className="text-sm hover:underline">Log in</a>
              <Button asChild variant="outline">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary to-primary/50 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Track Your Progress</h1>
            <p className="text-xl md:text-2xl mb-8">Monitor your tasks and projects in real-time.</p>
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Users />, title: "Team Collaboration", description: "Work seamlessly with your team members, assign tasks, and track progress together." },
                { icon: <Folder />, title: "Project Management", description: "Organize your work into projects, set milestones, and manage resources effectively." },
                { icon: <List />, title: "Task Tracking", description: "Create, assign, and monitor tasks with ease. Set priorities and deadlines to stay on top of your work." },
              ].map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center text-center">
          <div className="h-12 w-12 mb-4 text-primary">{icon}</div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}