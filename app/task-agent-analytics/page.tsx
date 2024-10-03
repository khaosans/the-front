'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, CheckCircle, Clock, AlertTriangle, MoreHorizontal } from 'lucide-react';

const performanceData = [
  { date: '2023-01', completionRate: 85, avgTime: 120 },
  { date: '2023-02', completionRate: 88, avgTime: 115 },
  { date: '2023-03', completionRate: 92, avgTime: 110 },
  { date: '2023-04', completionRate: 90, avgTime: 112 },
  { date: '2023-05', completionRate: 95, avgTime: 105 },
  { date: '2023-06', completionRate: 93, avgTime: 108 },
];

const taskDistributionData = [
  { name: 'Completed', value: 300, color: '#10B981' },
  { name: 'In Progress', value: 150, color: '#3B82F6' },
  { name: 'Pending', value: 100, color: '#F59E0B' },
  { name: 'Failed', value: 50, color: '#EF4444' },
];

const agentPerformanceData = [
  { name: 'Agent 1', tasks: 120, completionRate: 95 },
  { name: 'Agent 2', tasks: 100, completionRate: 88 },
  { name: 'Agent 3', tasks: 80, completionRate: 92 },
  { name: 'Agent 4', tasks: 90, completionRate: 85 },
  { name: 'Agent 5', tasks: 110, completionRate: 90 },
];

export default function TaskAgentAnalyticsDashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Task Agent Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { title: 'Total Tasks', value: '1,234', change: '+12.5%', icon: Activity, color: 'text-blue-500' },
          { title: 'Completion Rate', value: '92%', change: '+3.2%', icon: CheckCircle, color: 'text-green-500' },
          { title: 'Avg. Completion Time', value: '108 min', change: '-1.5%', icon: Clock, color: 'text-yellow-500' },
          { title: 'Failed Tasks', value: '23', change: '-0.8%', icon: AlertTriangle, color: 'text-red-500' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Task completion rate and average completion time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="completionRate" yAxisId="left" stroke="#8884d8" fill="#8884d8" name="Completion Rate (%)" />
                  <Area type="monotone" dataKey="avgTime" yAxisId="right" stroke="#82ca9d" fill="#82ca9d" name="Avg. Time (min)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Current status of all tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agent Performance</CardTitle>
          <CardDescription>Task completion and efficiency by agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="tasks" fill="#8884d8" name="Tasks Completed" />
                <Bar yAxisId="right" dataKey="completionRate" fill="#82ca9d" name="Completion Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Latest tasks processed by agents</CardDescription>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completion Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 'T-1234', agent: 'Agent 1', status: 'Completed', time: '1h 23m' },
                { id: 'T-1235', agent: 'Agent 2', status: 'In Progress', time: '45m' },
                { id: 'T-1236', agent: 'Agent 3', status: 'Failed', time: '2h 05m' },
                { id: 'T-1237', agent: 'Agent 4', status: 'Completed', time: '52m' },
                { id: 'T-1238', agent: 'Agent 5', status: 'In Progress', time: '1h 10m' },
              ].map((task, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.agent}</TableCell>
                  <TableCell>
                    <Badge variant={task.status === 'Completed' ? 'default' : task.status === 'In Progress' ? 'secondary' : 'destructive'}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.time}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}