import React from 'react';
import Todo from './Todo';
import Task from './Task';

interface Todo {
    title: string;
    completed: boolean;
}

interface TaskType {
    title: string;
    description: string;
    priority: string;
    assignee: string;
    dueDate: string;
}

interface TodoListProps {
    todos: Todo[];
    tasks: TaskType[];
}

const TodoList: React.FC<TodoListProps> = ({ todos, tasks }) => {
    return (
        <div>
            <h2>Todos</h2>
            {todos.map((todo, index) => (
                <Todo key={index} todo={todo} />
            ))}
            <h2>Tasks</h2>
            {tasks.map((task, index) => (
                <Task key={index} task={task} />
            ))}
        </div>
    );
};

export default TodoList;
