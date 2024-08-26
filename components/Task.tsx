import { SetStateAction, useState } from "react";

interface TaskType {
  title: string;
  description: string;
  priority: string;
  assignee: string;
  dueDate: string;
}

export default function Task({ task }: { task: TaskType }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [assignee, setAssignee] = useState(task.assignee);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleTitleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPriority(e.target.value);
  };

  const handleAssigneeChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setAssignee(e.target.value);
  };

  const handleDueDateChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setDueDate(e.target.value);
  };

  return (
    <div className="bg-gray-100 p-2 rounded">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2">
        <label className="mr-2">Priority:</label>
        <select value={priority} onChange={handlePriorityChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mt-2">
        <label className="mr-2">Assignee:</label>
        <input type="text" value={assignee} onChange={handleAssigneeChange} />
      </div>
      <div className="mt-2">
        <label className="mr-2">Due Date:</label>
        <input type="date" value={dueDate} onChange={handleDueDateChange} />
      </div>
    </div>
  );
}
