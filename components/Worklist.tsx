import React, { useState, useEffect } from 'react';
import Workcard from './Workcard';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Workcard {
  id: number;
  title: string;
  description: string;
  // Add other properties as needed
}

const defaultWorkcards: Workcard[] = [
  { id: 1, title: 'Default Task 1', description: 'Description for default task 1' },
  { id: 2, title: 'Default Task 2', description: 'Description for default task 2' },
  { id: 3, title: 'Default Task 3', description: 'Description for default task 3' },
];

const Worklist: React.FC<{ worklistId: number }> = ({ worklistId }) => {
  const [workcards, setWorkcards] = useState<Workcard[]>(defaultWorkcards);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchWorkcards = async () => {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('list_id', worklistId);
      if (error) {
        console.error('Error fetching workcards:', error);
      } else if (data.length > 0) {
        setWorkcards(data);
      }
    };

    fetchWorkcards();
  }, [worklistId]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(workcards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWorkcards(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="workcards">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <h3 style={{ color: 'var(--foreground)' }}>Worklist</h3>
            <div>
              {workcards.map((workcard, index) => (
                <Draggable key={workcard.id} draggableId={String(workcard.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Workcard workcard={workcard} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Worklist;
