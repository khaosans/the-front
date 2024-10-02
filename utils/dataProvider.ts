import { Task, Project } from '../lib/task';
import { TeamMember } from '../lib/teamMember';

// Example data provider functions
const getTasks = async (): Promise<Task[]> => { 
  return [
    // Add more tasks as needed
    { id: '1', title: 'Task 1', description: 'Description of Task 1', status: 'todo', project_id: '1', team_id: '1', priority: 'low', assignee: '1', dueDate: '2023-07-15', comments: [], columnId: 1, columnName: 'Column 1' },
  ];
};

const getProjects = async (): Promise<Project[]> => {
  return [
    { id: '1', name: 'Project A', description: 'Description of Project A', progress: 0, startDate: '2023-01-01', endDate: '2023-12-31', teamId: '1' },
  ];
};

const getTeamMembers = async (): Promise<TeamMember[]> => {
  return [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead', avatar: 'https://avatar.vercel.sh/john.png', project_id: '1', team_id: '1' },
  ];
};

// Export the data provider functions
export { getTasks, getProjects, getTeamMembers };