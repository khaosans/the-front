import { TASK_STATUS } from '@/constants/workTrackerConstants';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: keyof typeof TASK_STATUS;
    position: number;
}
