export interface Agent {
  id: number; // Ensure this matches the expected type
  name: string;
  avatar: string;
  expertise: string;
  backstory: string;
  tools: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  objective: string;
  difficulty: string;
  estimatedTime: string;
  status: string;
  assignedAgents: Agent[];
  recommendedTools: string[];
  projectId: string;
  assignee: string;
  dueDate: string;
  priority: string;
  agents: string[];
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
  { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", expertise: "Frontend Development", backstory: "", tools: [] },
  { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", expertise: "Backend Development", backstory: "", tools: [] },
  { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40", expertise: "DevOps", backstory: "", tools: [] },
  { id: 4, name: "Diana Prince", avatar: "/placeholder.svg?height=40&width=40", expertise: "UI/UX Design", backstory: "", tools: [] },
];
