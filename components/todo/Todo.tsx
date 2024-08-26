interface Todo {
    title: string;
    completed: boolean;
}

interface TodoProps {
    todo: Todo;
}

export default function Todo({ todo }: TodoProps) {
    return (
        <div className="flex items-center space-x-3 mb-2">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {/* Implement toggle logic */}}
                className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
            </span>
        </div>
    );
}
