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
export interface Message {
  role: 'user' | 'assistant';
  content: string;
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