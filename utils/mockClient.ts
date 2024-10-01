import { Task, Project, TeamMember } from '../types/types';

// Mock data
const mockTasks: Task[] = [
  { id: '1', title: 'Task 1', status: 'todo', project: 'Project A' },
  { id: '2', title: 'Task 2', status: 'inprogress', project: 'Project B' },
  { id: '3', title: 'Task 3', status: 'done', project: 'Project C' },
];

const mockProjects: Project[] = [
  { id: '1', name: 'Project A', description: 'Description of Project A' },
  { id: '2', name: 'Project B', description: 'Description of Project B' },
  { id: '3', name: 'Project C', description: 'Description of Project C' },
];

const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'John Doe', role: 'Developer', avatar: '/avatars/john.jpg' },
  { id: '2', name: 'Jane Smith', role: 'Designer', avatar: '/avatars/jane.jpg' },
  { id: '3', name: 'Bob Johnson', role: 'Manager', avatar: '/avatars/bob.jpg' },
];

class MockClient {
  async getTasks(): Promise<Task[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTasks), 500);
    });
  }

  async getProjects(): Promise<Project[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProjects), 500);
    });
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTeamMembers), 500);
    });
  }
}

const mockClient = new MockClient();
export default mockClient;