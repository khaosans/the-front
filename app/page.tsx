'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Users, Briefcase, Bot, BarChart, Settings, Workflow, FileText} from 'lucide-react';
import ChatbotModal from '@/components/ChatbotModal';
import ChatModal from '@/components/ChatModal';

const pages = [
  { title: 'Dashboard', description: 'Overview of your projects and tasks', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'Teams', description: 'Manage your teams and members', icon: Users, href: '/teams' },
  { title: 'Projects', description: 'View and manage your projects', icon: Briefcase, href: '/projects' },
  { title: 'Agent Design', description: 'Manage AI agents for task assistance', icon: Bot, href: '/agent-design' },
  { title: 'Task Design', description: 'Manage tasks and workflows', icon: Workflow, href: '/task-design' },
  { title: 'Analytics', description: 'Insights and performance metrics', icon: BarChart, href: '/analytics' },
  { title: 'Documentation', description: 'View the documentation', icon: FileText, href: '/documentation' },
  { title: 'Settings', description: 'Configure your account and preferences', icon: Settings, href: '/settings' },
];

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Welcome to TaskFlow</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <page.icon className="mr-2 h-6 w-6" />
                {page.title}
              </CardTitle>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={page.href} passHref>
                <Button className="w-full">
                  Go to {page.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}