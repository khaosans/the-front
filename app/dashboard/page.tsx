'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Activity, MoreHorizontal, ChevronRight } from 'lucide-react';

const taskData = [
  { name: 'Jan', tasks: 40 },
  { name: 'Feb', tasks: 30 },
  { name: 'Mar', tasks: 50 },
  { name: 'Apr', tasks: 45 },
  { name: 'May', tasks: 60 },
  { name: 'Jun', tasks: 55 },
];

const agentData = [
  { name: 'Agent A', value: 40, color: '#0088FE' },
  { name: 'Agent B', value: 30, color: '#00C49F' },
  { name: 'Agent C', value: 30, color: '#FFBB28' },
  { name: 'Agent D', value: 20, color: '#FF8042' },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Tasks', value: '150', change: '+10%', icon: Activity, color: 'text-green-500' },
          { title: 'Active Agents', value: '25', change: '+5%', icon: Users, color: 'text-blue-500' },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className={`text-xs ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {item.change.startsWith('+') ? <ArrowUpRight className="inline h-4 w-4" /> : <ArrowDownRight className="inline h-4 w-4" />}
                {item.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Task Overview</CardTitle>
            <CardDescription>Monthly task performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={taskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="tasks" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agent Distribution</CardTitle>
            <CardDescription>Tasks handled by agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={agentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {agentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest task updates</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: 'Agent A', action: 'completed a task', time: '2 hours ago' },
              { user: 'Agent B', action: 'started a new task', time: '4 hours ago' },
              { user: 'Agent C', action: 'updated task details', time: '1 day ago' },
              { user: 'Agent D', action: 'reviewed a task', time: '2 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{activity.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.user} <span className="text-muted-foreground">{activity.action}</span></p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}