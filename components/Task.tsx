import { Task } from "@react-dnd/asap";

// Ensure Task type has id as string
export interface TaskItem extends Task{
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    comments: number;
}
