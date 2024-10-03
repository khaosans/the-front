//@ts-nocheck
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Code, Bug, Briefcase, Server, Plus, Edit, Trash2 } from 'lucide-react';

const initialAgents = [
  { id: 1, name: 'CodeMaster', role: 'Software Developer', expertise: 'Full-stack development', prompt: 'You are an expert full-stack developer. Provide detailed and efficient solutions to coding problems.', avatar: 'CM', icon: Code },
  { id: 2, name: 'BugHunter', role: 'QA Engineer', expertise: 'Test automation', prompt: 'You are a skilled QA engineer specializing in test automation. Identify potential issues and suggest comprehensive test strategies.', avatar: 'BH', icon: Bug },
  { id: 3, name: 'ProductGenius', role: 'Product Manager', expertise: 'Agile methodologies', prompt: 'You are an experienced product manager well-versed in agile methodologies. Provide insights on product strategy and feature prioritization.', avatar: 'PG', icon: Briefcase },
  { id: 4, name: 'InfraWizard', role: 'DevOps Engineer', expertise: 'Cloud infrastructure', prompt: 'You are a DevOps expert with deep knowledge of cloud infrastructure. Offer advice on optimizing deployment pipelines and infrastructure management.', avatar: 'IW', icon: Server },
];

const initialTasks = [
  { id: 1, title: 'Implement user authentication', status: 'In Progress', assignedAgent: null },
  { id: 2, title: 'Design database schema', status: 'To Do', assignedAgent: null },
  { id: 3, title: 'Set up CI/CD pipeline', status: 'In Progress', assignedAgent: null },
  { id: 4, title: 'Create product roadmap', status: 'To Do', assignedAgent: null },
];

export default function AIAgentManagementDashboard() {
  const [agents, setAgents] = useState(initialAgents);
  const [tasks, setTasks] = useState(initialTasks);
  const [newAgent, setNewAgent] = useState({ name: '', role: '', expertise: '', prompt: '' });
  const [editingAgent, setEditingAgent] = useState(null);

  const addAgent = () => {
    if (newAgent.name && newAgent.role && newAgent.expertise && newAgent.prompt) {
      setAgents([...agents, { ...newAgent, id: agents.length + 1, avatar: newAgent.name.substring(0, 2).toUpperCase(), icon: Bot }]);
      setNewAgent({ name: '', role: '', expertise: '', prompt: '' });
    }
  };

  const updateAgent = () => {
    if (editingAgent) {
      setAgents(agents.map(agent => 
        agent.id === (editingAgent as typeof initialAgents[number]).id ? editingAgent : agent
      ));
      setEditingAgent(null);
    }
  };

  const deleteAgent = (id: number | null) => {
    setAgents(agents.filter(agent => agent.id !== id));
    setTasks(tasks.map(task => task.assignedAgent === id ? { ...task, assignedAgent: null } : task));
  };

  const assignAgentToTask = (taskId: number, agentId: number) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, assignedAgent: agentId } : task));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">AI Agent Management Dashboard</h1>

      <Tabs defaultValue="agents" className="space-y-8">
        <TabsList>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {agent.name}
                  </CardTitle>
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${agent.avatar}`} />
                    <AvatarFallback>{agent.avatar}</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">{agent.role}</div>
                  <div className="text-sm text-muted-foreground">Expertise: {agent.expertise}</div>
                  <div className="mt-2 text-xs text-muted-foreground">Prompt: {agent.prompt.substring(0, 100)}...</div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Agent</DialogTitle>
                        <DialogDescription>Make changes to the AI agent here.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" value={editingAgent?.name} onChange={(e) => setEditingAgent({...editingAgent, name: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">Role</Label>
                          <Input id="role" value={editingAgent?.role} onChange={(e) => setEditingAgent({...editingAgent, role: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="expertise" className="text-right">Expertise</Label>
                          <Input id="expertise" value={editingAgent?.expertise} onChange={(e) => setEditingAgent({...editingAgent, expertise: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="prompt" className="text-right">Prompt</Label>
                          <Textarea id="prompt" value={editingAgent?.prompt} onChange={(e) => setEditingAgent({...editingAgent, prompt: e.target.value})} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={updateAgent}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" onClick={() => deleteAgent(agent.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Add New AI Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-name" className="text-right">Name</Label>
                  <Input id="new-name" value={newAgent.name} onChange={(e) => setNewAgent({...newAgent, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-role" className="text-right">Role</Label>
                  <Input id="new-role" value={newAgent.role} onChange={(e) => setNewAgent({...newAgent, role: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-expertise" className="text-right">Expertise</Label>
                  <Input id="new-expertise" value={newAgent.expertise} onChange={(e) => setNewAgent({...newAgent, expertise: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-prompt" className="text-right">Prompt</Label>
                  <Textarea id="new-prompt" value={newAgent.prompt} onChange={(e) => setNewAgent({...newAgent, prompt: e.target.value})} className="col-span-3" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={addAgent}>Add Agent</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Task Board</CardTitle>
              <CardDescription>Assign AI agents to tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Agent</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>
                        <Badge variant={task.status === 'In Progress' ? 'default' : 'secondary'}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{agents.find(agent => agent.id === task.assignedAgent)?.name || 'Unassigned'}</TableCell>
                      <TableCell>
                        <Select onValueChange={(value) => assignAgentToTask(task.id, parseInt(value))}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Assign agent" />
                          </SelectTrigger>
                          <SelectContent>
                            {agents.map((agent) => (
                              <SelectItem key={agent.id} value={agent.id.toString()}>{agent.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}