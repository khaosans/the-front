import { useState } from "react";
import Task from "./todo/Task";

export default function List({ list }: { list: { id: number; title: string; tasks: any[] } }) {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [tasks, setTasks] = useState(list.tasks);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    // TODO: Update list title in the app state
    setIsEditing(false);
  };

  const handleNewTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const handleNewTaskDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDescription(e.target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      description: newTaskDescription,
      priority: "Low",
      assignee: "",
      dueDate: "",
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
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
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="New task title"
          value={newTaskTitle}
          onChange={handleNewTaskTitleChange}
          className="w-full mb-2 p-1 border rounded"
        />
        <input
          type="text"
          placeholder="New task description"
          value={newTaskDescription}
          onChange={handleNewTaskDescriptionChange}
          className="w-full mb-2 p-1 border rounded"
        />
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-500 text-white p-1 rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
