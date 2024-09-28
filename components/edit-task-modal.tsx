import React from 'react';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: string) => void;
  initialTask: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, onSave, initialTask }) => {
  const [task, setTask] = React.useState(initialTask);

  const handleSave = () => {
    onSave(task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <h2>Edit Task</h2>
      <textarea value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditTaskModal;