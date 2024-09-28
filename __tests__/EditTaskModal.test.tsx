import { render, screen, fireEvent } from '@testing-library/react';
import { EditTaskModal } from '@/app/taskboard/edit-task-modal'; // Ensure this path is correct

describe('EditTaskModal', () => {
    const mockTask = {
        id: '1',
        title: 'Sample Task',
        description: 'This is a sample task description.',
        priority: 'high', // Add the missing property
        comments: [], // Add the missing property
        // Add other necessary task properties as needed
    };


    it('calls the save function when the save button is clicked', () => {
        const mockProps = {
            task: mockTask,
            isOpen: true, // Set isOpen to true to render the modal
            onClose: jest.fn(),
            onSave: jest.fn(), // Assuming there's an onSave prop
        };

        render(<EditTaskModal {...mockProps} />);

        // Simulate clicking the save button
        fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

        // Assert that onSave was called
        expect(mockProps.onSave).toHaveBeenCalled();
    });

    // Add more tests as necessary
});
