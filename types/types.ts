export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed'; // Ensure this matches your mock data
  dueDate: string; // ISO date format
  assignee: string; // User ID
  priority: 'high' | 'medium' | 'low';
  comments: string[]; // Array of comment strings
  project_id: string; // Project ID
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number; // Progress percentage
  startDate: string; // Start date in ISO format
  endDate: string; // End date in ISO format
  teamId: string; // ID of the team associated with the project
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string; // Role of the team member
  avatar: string; // URL to the member's avatar
  project_id: string; // ID of the project the member is associated with
  team_id: string; // ID of the team the member belongs to
  avatar_url: string; // URL to the avatar image
}

export interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: string; // Creation date in ISO format
  members: TeamMember[]; // Array of team members
}

export interface Taskboard {
  id: string;
  name: string;
  projectId: string; // ID of the project the taskboard belongs to
  columns: {
    id: string;
    name: string;
    taskIds: string[]; // Array of task IDs in this column
  }[];
}

export interface Settings {
  userId: string; // ID of the user
  theme: string; // Theme preference
  notifications: boolean; // Notification preference
  language: string; // Language preference
}

export interface ActivityData {
  name: string; // Name of the activity
  tasks: number; // Number of tasks associated with the activity
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer'; // Role of the member
  avatar?: string; // Optional avatar URL
}

export interface Column {
  id: string;
  name: string; // Name of the column
  taskIds: string[]; // Array of task IDs in this column
}

export interface Board {
  id: string;
  name: string; // Name of the board
  totalTasks: number; // Total number of tasks in the board
  completedTasks: number; // Number of completed tasks
}

export interface TaskList {
  id: string;
  name: string; // Name of the task list
  projectId: string; // ID of the project the task list belongs to
  order: number; // Order of the task list
  createdAt: string; // Creation date in ISO format
  updatedAt: string; // Last updated date in ISO format
}
