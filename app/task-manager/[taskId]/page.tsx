'use client';

import { useParams, useRouter } from 'next/navigation'; // Ensure useRouter is imported
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Task, Agent } from '@/types';
import TaskDetailView from '@/components/task-detail-view'; // Ensure this path is correct

// Mock data for tasks and agents (replace with actual data fetching logic)
const mockTasks: Task[] = [
    {
        id: "1" as any,
        title: "Optimize Database Queries",
        description: "Our database queries are running slowly, impacting system performance. We need to optimize these queries to improve overall system speed.",
        objective: "Reduce query execution time by 50%",
        difficulty: "High",
        estimatedTime: "3 days",
        status: "In Progress",
        assignedAgents: [],
        recommendedTools: ["SQL Profiler", "Index Tuning Wizard"],
        projectId: "1" as any,
        assignee: "Alice Johnson",
        dueDate: "2024-01-01",
        priority: "High",
        agents: ["Alice Johnson", "Bob Smith"],
    },  


  {
    id: "2" as any,
    title: "Fix Login Page Bug",
    description: "Users are reporting intermittent issues with the login page. We need to investigate and fix this bug to ensure smooth user access.",
    objective: "Identify and resolve the login page issue",
    difficulty: "Medium",
    estimatedTime: "1 day",
    status: "To Do",
    assignedAgents: [],
    recommendedTools: ["Browser DevTools", "Authentication Library"],
    projectId: "1" as any,
    assignee: "Bob Smith",
    dueDate: "2024-01-01",
    priority: "High",
    agents: ["Bob Smith", "Charlie Brown"],
  }
];

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    expertise: "Frontend Development",
    backstory: "Alice is a frontend developer with a passion for creating beautiful and functional user interfaces.",
    tools: ["React", "JavaScript", "CSS"],
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    expertise: "Backend Development",
    backstory: "Bob is a backend developer with a passion for creating scalable and secure web applications.",
    tools: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: "3",
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    expertise: "DevOps",
    backstory: "Charlie is a devops engineer with a passion for creating scalable and secure web applications.",
    tools: ["Docker", "Kubernetes", "Jenkins"],
  },
  {
    id: "4",
    name: "Diana Prince",
    avatar: "/placeholder.svg?height=40&width=40",
    expertise: "UI/UX Design",
    backstory: "Diana is a ui/ux designer with a passion for creating beautiful and functional user interfaces.",
    tools: ["Figma", "Adobe XD", "Sketch"],
  }
];


//user params to get the taskId
export default function TaskDetailPage({ params }: { params: { taskId: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    //cast them both to string
    const taskId = params.taskId as unknown as string;
    const fetchedTask = mockTasks.find(t => t.id === taskId) || null;
    setTask(fetchedTask);
    setLoading(false); // Set loading to false after fetching
  }, [params.taskId]);

  const handleUpdate = (updatedTask: Task) => {
    console.log('Updating task:', updatedTask); // Ensure console is available
    setTask(updatedTask);
  };

  const handleClose = () => {
    router.push('/task-manager');
  };

  if (loading) {
    return <div className="container mx-auto py-10 text-center text-gray-200">Loading...</div>; // Show loading state
  }

  if (!task) {
    return <div className="container mx-auto py-10 text-center text-gray-200">Task not found</div>;
  }

  return (
    <div className="container mx-auto py-10 bg-gray-900 text-white min-h-screen">
      <Button onClick={handleClose} className="mb-4">Back to Task Manager</Button>
      <TaskDetailView
        task={task}
        isOpen={true}
        onClose={handleClose}
        onUpdate={handleUpdate}
        agents={mockAgents} 
        params={params}
      />
    </div>
  );
}