import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from '@/types/Task';
import styles from './Column.module.css';
import { TASK_STATUS } from '@/constants/workTrackerConstants';

interface ColumnProps {
    title: string;
    tasks: Task[];
    onAddTask?: (title: string, description: string) => void;
    onRemoveTask: (id: string) => void;
    droppableId: string;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onAddTask, onRemoveTask, droppableId }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const handleAddTask = () => {
        if (onAddTask && newTaskTitle.trim() !== '') {
            onAddTask(newTaskTitle, newTaskDescription);
            setNewTaskTitle('');
            setNewTaskDescription('');
        }
    };

    return (
        <div className={styles.column}>
            <h2 className={styles.columnTitle}>{title}</h2>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${styles.tasksContainer} ${snapshot.isDraggingOver ? styles.draggingOver : ''}`}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`${styles.taskCard} ${snapshot.isDragging ? styles.dragging : ''}`}
                                    >
                                        <h3>{task.title}</h3>
                                        <p>{task.description.substring(0, 50)}...</p>
                                        <p>Status: {task.status}</p>
                                        <button 
                                            onClick={() => onRemoveTask(task.id)}
                                            className={styles.removeTaskButton}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {title === TASK_STATUS.TODO && (
                <div className={styles.addTaskForm}>
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Enter task title"
                        className={styles.addTaskInput}
                    />
                    <input
                        type="text"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        placeholder="New task description"
                        className={styles.addTaskInput}
                    />
                    <button 
                        onClick={handleAddTask}
                        className={styles.addTaskButton}
                    >
                        Add Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default Column;
