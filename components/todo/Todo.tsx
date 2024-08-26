import { Todo } from "@/app/types/todo";

interface TodoComponentProps {
    todo: Todo;
    onToggle: () => void;
    onDelete: () => void;
}

export default function TodoComponent({ todo, onToggle, onDelete }: TodoComponentProps) {
    return (
        <li className="flex items-center space-x-3 bg-gray-700 p-3 rounded">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
                className="form-checkbox h-5 w-5 text-blue-600 rounded bg-gray-600 border-gray-500"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                {todo.title || todo.text}
            </span>
            <button
                onClick={onDelete}
                className="text-red-400 hover:text-red-300 transition-colors"
            >
                Delete
            </button>
        </li>
    );
}