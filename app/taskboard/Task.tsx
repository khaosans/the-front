
// Ensure Task type has id as string
export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    comments: number;
}
