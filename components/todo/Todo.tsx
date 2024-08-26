import { Todo as TodoType } from "@/app/types/todo"

interface TodoProps {
    todo: TodoType;
    onToggle: () => void;
    onDelete: () => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoProps) {
    return (
        <li className="flex items-center space-x-3 bg-gray-800 p-3 rounded">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
                className="form-checkbox h-5 w-5 text-blue-600 rounded bg-gray-700 border-gray-600"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                {todo.title}
            </span>
            <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 transition-colors"
            >
                Delete
            </button>
        </li>
    );
}