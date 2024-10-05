import { Agent } from '@/app/task-manager/page';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  dueDate: string;
  assignees: string[];
  tags: string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  dueDate: string;
  priority: string;
  agents: string[];
  objective: string;
  difficulty: string;
  estimatedTime: string;
  assignedAgents: string[];
  recommendedTools: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  expertise: string;
  backstory: string;
  tools: string[];
}


export interface TaskDetailViewProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
  agents: Agent[];
  params: { taskId: string };
}
// Mock data for agents (replace with actual data from agent-manager)
export const agentsData: Agent[] = [
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", expertise: "Frontend Development" },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", expertise: "Backend Development" },
    { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40", expertise: "DevOps" },
    { id: 4, name: "Diana Prince", avatar: "/placeholder.svg?height=40&width=40", expertise: "UI/UX Design" },
];
