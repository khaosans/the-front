import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface CardProps {
  id: string;
  index: number;
  title: string;
  onEdit: (id: string) => void; // Add an edit handler
}

const Card: React.FC<CardProps> = ({ id, index, title, onEdit }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 border rounded shadow mb-2 bg-white"
        >
          <div className="flex justify-between items-center">
            <span>{title}</span>
            <button 
              onClick={() => onEdit(id)} 
              className="text-blue-500 hover:underline"
            >
              Edit
            </button> {/* Edit button */}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;