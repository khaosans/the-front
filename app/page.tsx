'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Users, Briefcase, Bot, BarChart, Settings, CheckSquare, Bell } from 'lucide-react';
import DynamicWallpaper from '@/components/dynamic-wallpaper';

const pages = [
  { title: 'Dashboard', description: 'Overview of your projects and tasks', icon: LayoutDashboard, href: '/dashboard' },
  { title: 'Teams', description: 'Manage your teams and members', icon: Users, href: '/teams' },
  { title: 'Projects', description: 'View and manage your projects', icon: Briefcase, href: '/projects' },
  { title: 'Tasks', description: 'Manage your tasks and to-dos', icon: CheckSquare, href: '/tasks' },
  { title: 'AI Agents', description: 'Manage AI agents for task assistance', icon: Bot, href: '/ai-agents' },
  { title: 'Analytics', description: 'Insights and performance metrics', icon: BarChart, href: '/analytics' },
  { title: 'Settings', description: 'Configure your account and preferences', icon: Settings, href: '/settings' },
  { title: 'Notifications', description: 'View your latest notifications', icon: Bell, href: '/notifications' },
];

export default function HomePage() {
  return (
    <>
      <DynamicWallpaper />
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Welcome to Task-Flow</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page, index) => (
              <Card key={index} className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700 hover:bg-gray-700 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-400">
                    <page.icon className="mr-2 h-6 w-6" />
                    {page.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">{page.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={page.href} passHref className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Go to {page.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}