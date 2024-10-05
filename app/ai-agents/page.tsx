'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DynamicWallpaper from '@/components/dynamic-wallpaper';

const aiAgents = [
  { name: 'Task Scheduler', type: 'Productivity' },
  { name: 'Code Assistant', type: 'Development' },
  { name: 'Data Analyzer', type: 'Analytics' },
  { name: 'Customer Support Bot', type: 'Support' },
];

export default function AIAgentsPage() {
  return (
    <>
      <DynamicWallpaper primaryColor="cyan" secondaryColor="teal" />
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">AI Agents</h1>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Agent
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiAgents.map((agent, index) => (
              <Card key={index} className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-cyan-400">
                    <Bot className="mr-2 h-6 w-6" />
                    {agent.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Type: {agent.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}