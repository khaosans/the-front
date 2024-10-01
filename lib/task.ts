export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'completed';
    dueDate: string;
    assignee: string;
    project_id: string;
    priority: 'low' | 'medium' | 'high';

}
