import { Project, Task, User, Announcement } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Overhaul the company website with a modern, responsive design',
    status: 'In Progress',
    progress: 65,
    dueDate: '2023-08-15',
    assignees: ['user1', 'user2', 'user3'],
    tags: ['design', 'frontend', 'high-priority']
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Create a cross-platform mobile app for our main product',
    status: 'Planning',
    progress: 20,
    dueDate: '2023-10-30',
    assignees: ['user2', 'user4'],
    tags: ['mobile', 'react-native', 'api-integration']
  },
  {
    id: '3',
    name: 'Data Analytics Platform',
    description: 'Build a comprehensive data analytics dashboard for clients',
    status: 'On Hold',
    progress: 40,
    dueDate: '2023-09-22',
    assignees: ['user1', 'user5'],
    tags: ['data', 'backend', 'visualization']
  },
  {
    id: '4',
    name: 'E-commerce Integration',
    description: 'Integrate e-commerce functionality into the existing platform',
    status: 'Completed',
    progress: 100,
    dueDate: '2023-07-01',
    assignees: ['user3', 'user4', 'user5'],
    tags: ['e-commerce', 'payment-gateway', 'security']
  },
  {
    id: '5',
    name: 'AI Chatbot Implementation',
    description: 'Develop and deploy an AI-powered chatbot for customer support',
    status: 'In Progress',
    progress: 55,
    dueDate: '2023-11-15',
    assignees: ['user2', 'user5'],
    tags: ['ai', 'machine-learning', 'customer-support']
  }
];

export const mockTasks: Task[] = [
  {
    id: '101',
    projectId: '1',
    title: 'Design homepage mockup',
    description: 'Create a high-fidelity mockup for the new homepage design',
    status: 'Completed',
    assignee: 'user1',
    dueDate: '2023-07-20',
    priority: 'High'
  },
  {
    id: '102',
    projectId: '1',
    title: 'Implement responsive navigation',
    description: 'Develop a responsive navigation menu for all device sizes',
    status: 'In Progress',
    assignee: 'user2',
    dueDate: '2023-07-25',
    priority: 'Medium'
  },
  {
    id: '103',
    projectId: '2',
    title: 'Set up React Native environment',
    description: 'Configure development environment for React Native app',
    status: 'Completed',
    assignee: 'user4',
    dueDate: '2023-08-05',
    priority: 'High'
  },
  {
    id: '104',
    projectId: '2',
    title: 'Design app wireframes',
    description: 'Create low-fidelity wireframes for key app screens',
    status: 'In Progress',
    assignee: 'user2',
    dueDate: '2023-08-10',
    priority: 'Medium'
  },
  {
    id: '105',
    projectId: '3',
    title: 'Define data models',
    description: 'Design and document data models for analytics platform',
    status: 'Completed',
    assignee: 'user5',
    dueDate: '2023-08-15',
    priority: 'High'
  },
  {
    id: '106',
    projectId: '5',
    title: 'Train AI model',
    description: 'Train and fine-tune the AI model for the chatbot',
    status: 'In Progress',
    assignee: 'user5',
    dueDate: '2023-09-30',
    priority: 'High'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Project Manager',
    avatar: 'https://example.com/avatars/alice.jpg'
  },
  {
    id: 'user2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Senior Developer',
    avatar: 'https://example.com/avatars/bob.jpg'
  },
  {
    id: 'user3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'UI/UX Designer',
    avatar: 'https://example.com/avatars/charlie.jpg'
  },
  {
    id: 'user4',
    name: 'Diana Miller',
    email: 'diana@example.com',
    role: 'Frontend Developer',
    avatar: 'https://example.com/avatars/diana.jpg'
  },
  {
    id: 'user5',
    name: 'Ethan Davis',
    email: 'ethan@example.com',
    role: 'Data Scientist',
    avatar: 'https://example.com/avatars/ethan.jpg'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'New Project Management Tool Launch',
    content: 'We are excited to announce the launch of our new project management tool next week. Training sessions will be scheduled soon.',
    date: '2023-07-10',
    author: 'Alice Johnson'
  },
  {
    id: '2',
    title: 'Upcoming Team Building Event',
    content: 'Mark your calendars! We have a team building event planned for August 15th. More details to follow.',
    date: '2023-07-15',
    author: 'HR Department'
  },
  {
    id: '3',
    title: 'Q3 Goals and Objectives',
    content: 'The management team has finalized our Q3 goals and objectives. A company-wide meeting will be held on July 25th to discuss.',
    date: '2023-07-20',
    author: 'CEO Office'
  }
];