export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    comments: string[];
    status: 'todo' | 'inprogress' | 'done';
    assignee?: string; // Add if needed
    project_id?: string; // Add if needed
    team_id?: string; // Add if needed
    created_at?: string; // Add if needed
    updated_at?: string; // Add if needed
    tags?: string[]; // Add if needed
    
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