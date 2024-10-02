export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'inprogress' | 'done'; // This can be used for filtering
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    dueDate: string;
    comments: string[];
    columnId: string; // New property to reference the column
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