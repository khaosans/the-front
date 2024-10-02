'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDrag } from 'react-dnd';
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare } from 'lucide-react';
import { Task } from '@/lib/task';



const TaskCard: React.FC<{ task: Task; onEdit: (task: Task) => void }> = ({ task, onEdit }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card className="mb-2 cursor-move" onClick={() => onEdit(task)}>
                <CardHeader className="p-3">
                    <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                    <div className="flex justify-between items-center">
                        <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                            {task.priority}
                        </Badge>
                        <div className="flex items-center space-x-2">
                            {task.dueDate && (
                                <div className="flex items-center text-xs text-gray-500">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {task.dueDate}
                                </div>
                            )}
                            {task.comments.length > 0 && (
                                <div className="flex items-center text-xs text-gray-500">
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    {task.comments}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TaskCard;