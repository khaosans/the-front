'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Target, Clock, Users, CheckCircle2, MoveRight, AlertTriangle, Zap, Bomb, Skull, Code, Database, Server } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Link from 'next/link';
import TaskDetailView from '@/components/task-detail-view'; // Ensure this path is correct
import { agentsData } from '@/types';

export type Agent = {
  id: number;
  name: string;
  avatar: string;
  expertise: string;
};

type Task = {
  id: number;
  title: string;
  description: string;
  objective: string;
  difficulty: 'Low' | 'Medium' | 'High' | 'Critical';
  estimatedTime: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Completed';
  assignedAgents: Agent[];
  recommendedTools: string[];
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Optimize Database Queries",
    description: "Our database queries are running slowly, impacting system performance. We need to optimize these queries to improve overall system speed.",
    objective: "Reduce query execution time by 50%",
    difficulty: "High",
    estimatedTime: "3 days",
    status: "In Progress",
    assignedAgents: [],
    recommendedTools: ["SQL Profiler", "Index Tuning Wizard"]
  },
  {
    id: 2,
    title: "Fix Login Page Bug",
    description: "Users are reporting intermittent issues with the login page. We need to investigate and fix this bug to ensure smooth user access.",
    objective: "Identify and resolve the login page issue",
    difficulty: "Medium",
    estimatedTime: "1 day",
    status: "To Do",
    assignedAgents: [],
    recommendedTools: ["Browser DevTools", "Authentication Library"]
  }
];

const difficultyIcons = {
  Low: <Zap className="h-4 w-4 text-green-500" />,
  Medium: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  High: <Bomb className="h-4 w-4 text-orange-500" />,
  Critical: <Skull className="h-4 w-4 text-red-500" />
};

const toolIcons = {
  "SQL Profiler": <Database className="h-4 w-4" />,
  "Index Tuning Wizard": <Code className="h-4 w-4" />,
  "Browser DevTools": <Code className="h-4 w-4" />,
  "Authentication Library": <Server className="h-4 w-4" />
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    objective: '',
    difficulty: 'Low',
    estimatedTime: '',
    status: 'To Do',
    assignedAgents: [],
    recommendedTools: []
  });

  // In a real application, you would fetch agents from your backend
  useEffect(() => {
    // Simulating an API call to fetch agents
    // setAgents(fetchedAgents);
  }, []);

  const handleCreateTask = () => {
    if (currentTask.title && currentTask.description && currentTask.objective) {
      const newTask: Task = {
        id: Date.now(),
        title: currentTask.title,
        description: currentTask.description,
        objective: currentTask.objective,
        difficulty: currentTask.difficulty as Task['difficulty'],
        estimatedTime: currentTask.estimatedTime || 'Unknown',
        status: 'To Do',
        assignedAgents: currentTask.assignedAgents || [],
        recommendedTools: currentTask.recommendedTools || []
      };
      setTasks([...tasks, newTask]);
      setCurrentTask({
        title: '',
        description: '',
        objective: '',
        difficulty: 'Low',
        estimatedTime: '',
        status: 'To Do',
        assignedAgents: [],
        recommendedTools: []
      });
      setIsOpen(false);
    }
  };

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const assignAgentToTask = (taskId: number, agentId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const agent = agents.find(a => a.id === agentId);
        if (agent && !task.assignedAgents.some(a => a.id === agentId)) {
          return { ...task, assignedAgents: [...task.assignedAgents, agent] };
        }
      }
      return task;
    }));
  };

  const removeAgentFromTask = (taskId: number, agentId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, assignedAgents: task.assignedAgents.filter(a => a.id !== agentId) };
      }
      return task;
    }));
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTasks = Array.from(tasks);
    const [reorderedTask] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, reorderedTask);

    setTasks(newTasks.map(task => 
      task.id === parseInt(draggableId) ? { ...task, status: destination.droppableId as Task['status'] } : task
    ));
  };

  return (
    <div className="container mx-auto py-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Task Manager</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Task Board</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Create a New Task</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new task to the task board.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                  placeholder="e.g., 'Optimize Database Queries'"
                  className="bg-gray-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Task Description</Label>
                <Textarea
                  id="description"
                  value={currentTask.description}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                  placeholder="Describe the task in detail..."
                  className="bg-gray-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="objective">Task Objective</Label>
                <Input
                  id="objective"
                  value={currentTask.objective}
                  onChange={(e) => setCurrentTask({ ...currentTask, objective: e.target.value })}
                  placeholder="e.g., 'Reduce query execution time by 50%'"
                  className="bg-gray-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={currentTask.difficulty}
                  onValueChange={(value) => setCurrentTask({ ...currentTask, difficulty: value as Task['difficulty'] })}
                >
                  <SelectTrigger className="bg-gray-700 text-white">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white">
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estimatedTime">Estimated Time</Label>
                <Input
                  id="estimatedTime"
                  value={currentTask.estimatedTime}
                  onChange={(e) => setCurrentTask({ ...currentTask, estimatedTime: e.target.value })}
                  placeholder="e.g., '2 days' or '4 hours'"
                  className="bg-gray-700 text-white"
                />
              </div>
            </div>
            <Button onClick={handleCreateTask}>Create Task</Button>
          </DialogContent>
        </Dialog>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['To Do', 'In Progress', 'In Review', 'Completed'] as Task['status'][]).map((status) => (
            <div key={status} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{status}</h3>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                    {tasks.filter(task => task.status === status).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onStatusChange={updateTaskStatus}
                              onAssignAgent={assignAgentToTask}
                              onRemoveAgent={removeAgentFromTask}
                              agents={agents}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

function TaskCard({ task, onStatusChange, onAssignAgent, onRemoveAgent, agents }: {
  task: Task;
  onStatusChange: (id: number, status: Task['status']) => void;
  onAssignAgent: (taskId: number, agentId: number) => void;
  onRemoveAgent: (taskId: number, agentId: number) => void;
  agents: Agent[];
}) {
  return (
    <Card className="mb-4 bg-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center">
          {difficultyIcons[task.difficulty]}
          <Link href={`/task-manager/${task.id}`} className="ml-2 text-white hover:underline">
            {task.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-gray-400">Difficulty: {task.difficulty}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{task.description}</p>
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <Target className="mr-2 h-4 w-4" />
          Objective: {task.objective}
        </div>
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <Clock className="mr-2 h-4 w-4" />
          Estimated Time: {task.estimatedTime}
        </div>
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <Users className="mr-2 h-4 w-4" />
          Assigned Agents:
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {task.assignedAgents.map((agent) => (
            <div key={agent.id} className="flex items-center bg-gray-600 rounded-full px-3 py-1">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{agent.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-4 w-4 p-0 text-gray-400 hover:text-white"
                onClick={() => onRemoveAgent(task.id, agent.id)}
              >
                &times;
              </Button>
            </div>
          ))}
        </div>
        <Select onValueChange={(value) => onAssignAgent(task.id, parseInt(value))}>
          <SelectTrigger className="bg-gray-600 text-white">
            <SelectValue placeholder="Assign agent" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white">
            {agents.filter(agent => !task.assignedAgents.some(a => a.id === agent.id)).map((agent) => (
              <SelectItem key={agent.id} value={agent.id.toString()}>{agent.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Recommended Tools:</h4>
          <div className="flex flex-wrap gap-2">
            {task.recommendedTools.map((tool, index) => (
              <div key={index} className="flex items-center bg-gray-600 rounded-full px-3 py-1">
                {toolIcons[tool as keyof typeof toolIcons]}
                <span className="text-sm ml-2">{tool}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          {task.status !== 'Completed' && (
            <Button onClick={() => onStatusChange(task.id, 'Completed')} size="sm" variant="outline">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Completed
            </Button>
          )}
          {task.status !== 'In Review' && task.status !== 'Completed' && (
            <Button onClick={() => onStatusChange(task.id, 'In Review')} size="sm" variant="outline">
              <MoveRight className="mr-2 h-4 w-4" />
              Move to Review
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}