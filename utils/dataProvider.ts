import { Task, Project, TeamMember } from '../types/types';

// Example data provider functions
const getTasks = async (): Promise<Task[]> => { 
  return [
    { id: '1', title: 'Design new logo', description: 'Create a modern logo for our brand', status: 'in_progress', dueDate: '2023-07-15', assignee: '1', priority: 'high', comments: [], project_id: '1' },
    // Add more tasks as needed
  ];
};

const getProjects = async (): Promise<Project[]> => {
  return [
    { id: '1', name: 'Project A', description: 'Description of Project A', progress: 0, startDate: '2023-01-01', endDate: '2023-12-31', teamId: '1' },
  ];
};

const getTeamMembers = async (): Promise<TeamMember[]> => {
  return [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead', avatar: 'https://avatar.vercel.sh/john.png', project_id: '1', team_id: '1', avatar_url: 'https://avatar.vercel.sh/john.png' },
    // Add more team members as needed
  ];
};

// Export the data provider functions
export { getTasks, getProjects, getTeamMembers };