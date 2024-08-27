import { useState, useEffect } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Task } from '@/types/Task';
import { TASK_STATUS } from '@/constants/workTrackerConstants';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const useDragAndDrop = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('position');
    
    if (error) {
      console.error('Error fetching tasks:', error);
    } else if (data) {
      console.log('Fetched tasks:', data);
      setTasks(data);
    } else {
      console.log('No tasks found');
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(source.index, 1);
    
    // Update the task's status based on the destination column
    reorderedTask.status = destination.droppableId as keyof typeof TASK_STATUS;
    
    updatedTasks.splice(destination.index, 0, reorderedTask);

    // Update positions for all tasks in the affected columns
    const updatedPositions = updatedTasks.map((task, index) => ({
      id: task.id,
      status: task.status,
      position: index,
    }));

    setTasks(updatedTasks);

    // Update the database
    const { error } = await supabase
      .from('tasks')
      .upsert(updatedPositions);

    if (error) {
      console.error('Error updating tasks:', error);
      // Optionally, revert the state if the database update fails
      // setTasks(/* previous state */);
    }
  };

  return { tasks, setTasks, onDragEnd };
};
