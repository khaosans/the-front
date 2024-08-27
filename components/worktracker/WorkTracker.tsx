'use client';

import { DragDropContext } from 'react-beautiful-dnd';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import Column from './Column';
import { TASK_STATUS } from '@/constants/workTrackerConstants';
import styles from './WorkTracker.module.css';

const WorkTracker: React.FC = () => {
	const { tasks, setTasks, onDragEnd } = useDragAndDrop();
	const addTask = () => {
		// Implement addTask functionality
	};
	const removeTask = () => {
		// Implement removeTask functionality
	};

	console.log('Current tasks:', tasks);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.workTracker}>
				<div className={styles.columnsContainer}>
					{Object.entries(TASK_STATUS).map(([key, value]) => (
						<Column 
							key={key} 
							title={value} 
							droppableId={key}
							tasks={tasks.filter(task => task.status === key)}
							onAddTask={key === 'TODO' ? addTask : undefined}
							onRemoveTask={removeTask}
							/>
					))}
				</div>
			</div>
			</DragDropContext>
	);
}

export default WorkTracker;
