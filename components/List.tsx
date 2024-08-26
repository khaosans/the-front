import { useState } from "react";
import Task from "./Task";

export default function List({ list }: { list: { title: string; tasks: any[] } }) {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    // TODO: Update list title in the app state
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleSubmit}
          className="w-full mb-2 p-1 border rounded"
          autoFocus
        />
      ) : (
        <h2
          className="text-lg font-semibold mb-2 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h2>
      )}
      <div className="space-y-2">
        {list.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <button className="mt-4 w-full bg-btn-background hover:bg-btn-background-hover text-white font-bold py-2 px-4 rounded">
        Add Task
      </button>
    </div>
  );
}
