export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
  assignee: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
  teamId: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Taskboard {
  id: string;
  name: string;
  projectId: string;
  columns: TaskboardColumn[];
}

export interface TaskboardColumn {
  id: string;
  name: string;
  taskIds: string[];
}

export interface Settings {
  userId: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export interface ActivityData {
  name: string;
  tasks: number;
}

const mockTasks: Task[] = [
  { id: '1', title: 'Design new logo', description: 'Create a modern logo for our brand', status: 'in-progress', dueDate: '2023-07-15', assignee: '1', priority: 'high', comments: 3 },
  { id: '2', title: 'Update user documentation', description: 'Revise and update the user guide', status: 'todo', dueDate: '2023-07-20', assignee: '2', priority: 'medium', comments: 1 },
  { id: '3', title: 'Fix login bug', description: 'Resolve the issue with user authentication', status: 'completed', dueDate: '2023-07-10', assignee: '1', priority: 'high', comments: 5 },
  { id: '4', title: 'Implement new feature', description: 'Add the new messaging functionality', status: 'todo', dueDate: '2023-07-25', assignee: '3', priority: 'low', comments: 0 },
  { id: '5', title: 'Optimize database queries', description: 'Improve performance of main database queries', status: 'in-progress', dueDate: '2023-07-18', assignee: '2', priority: 'medium', comments: 2 },
  { id: '6', title: 'Write unit tests', description: 'Create comprehensive unit tests for the backend', status: 'todo', dueDate: '2023-07-30', assignee: '1', priority: 'high', comments: 1 },
  { id: '7', title: 'Design mobile UI', description: 'Create mockups for the mobile app interface', status: 'in-progress', dueDate: '2023-07-22', assignee: '3', priority: 'medium', comments: 4 },
  { id: '8', title: 'Refactor legacy code', description: 'Clean up and modernize old codebase', status: 'todo', dueDate: '2023-08-05', assignee: '2', priority: 'low', comments: 2 },
  { id: '9', title: 'Implement user feedback', description: 'Address top user requests from last survey', status: 'completed', dueDate: '2023-07-12', assignee: '1', priority: 'high', comments: 7 },
];

const mockProjects: Project[] = [
  { id: '1', name: 'Website Redesign', description: 'Overhaul of company website', progress: 75, startDate: '2023-06-01', endDate: '2023-08-31', teamId: '1' },
  { id: '2', name: 'Mobile App Development', description: 'Create a new mobile app for customers', progress: 30, startDate: '2023-07-01', endDate: '2023-12-31', teamId: '1' },
  { id: '3', name: 'Customer Portal', description: 'Build a portal for customer account management', progress: 50, startDate: '2023-05-15', endDate: '2023-09-30', teamId: '2' },
];

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Development Team',
    description: 'Responsible for building and maintaining our products',
    createdAt: '2023-06-01',
    members: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead', avatar: 'https://avatar.vercel.sh/john.png' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', avatar: 'https://avatar.vercel.sh/jane.png' },
    ]
  },
  {
    id: '2',
    name: 'Design Team',
    description: 'Creates user interfaces and experiences',
    createdAt: '2023-06-15',
    members: [
      { id: '3', name: 'Alice Johnson', email: 'alice@example.com', role: 'UI/UX Designer', avatar: 'https://avatar.vercel.sh/alice.png' },
    ]
  },
];

const mockTaskboards: Taskboard[] = [
  {
    id: '1',
    name: 'Website Redesign Board',
    projectId: '1',
    columns: [
      { id: 'col1', name: 'To Do', taskIds: ['2'] },
      { id: 'col2', name: 'In Progress', taskIds: ['1', '5'] },
      { id: 'col3', name: 'Done', taskIds: ['3'] },
    ]
  },
  {
    id: '2',
    name: 'Mobile App Board',
    projectId: '2',
    columns: [
      { id: 'col1', name: 'Backlog', taskIds: ['4'] },
      { id: 'col2', name: 'In Development', taskIds: [] },
      { id: 'col3', name: 'Testing', taskIds: [] },
      { id: 'col4', name: 'Completed', taskIds: [] },
    ]
  },
];

const mockSettings: Settings = {
  userId: '1',
  theme: 'light',
  notifications: true,
  language: 'en',
};

const mockWeeklyActivity: ActivityData[] = [
  { name: 'Mon', tasks: 3 },
  { name: 'Tue', tasks: 5 },
  { name: 'Wed', tasks: 2 },
  { name: 'Thu', tasks: 7 },
  { name: 'Fri', tasks: 4 },
  { name: 'Sat', tasks: 1 },
  { name: 'Sun', tasks: 0 },
];

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const mockMembers: Member[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Developer', avatar: 'https://avatar.vercel.sh/john.png' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', avatar: 'https://avatar.vercel.sh/jane.png' },
  { id: '3', name: 'Alice Johnson', email: 'alice@example.com', role: 'Manager', avatar: 'https://avatar.vercel.sh/alice.png' },
];

export const mockClient = {
  fetchTasks: async (): Promise<Task[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockTasks), 1000));
  },
  fetchProjects: async (): Promise<Project[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockProjects), 1000));
  },
  fetchTeams: async (): Promise<Team[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockTeams), 1000));
  },
  fetchTaskboards: async (): Promise<Taskboard[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockTaskboards), 1000));
  },
  fetchSettings: async (): Promise<Settings> => {
    return new Promise(resolve => setTimeout(() => resolve(mockSettings), 1000));
  },
  fetchWeeklyActivity: async (): Promise<ActivityData[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockWeeklyActivity), 1000));
  },
  fetchMembers: async (): Promise<Member[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockMembers), 1000));
  },
};