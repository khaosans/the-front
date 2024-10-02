import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditTaskModal } from "@/app/taskboard/edit-task-modal";
import {Task} from "@/lib/task";

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

describe('EditTaskModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockTask: Task = {
    id: '1',
    title: 'Initial Task',
    description: 'Initial Description',
    status: 'todo',
    priority: 'high',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <EditTaskModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        task={mockTask}
      />
    );

    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Initial Task')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <EditTaskModal
        isOpen={false}
        onClose={mockOnClose}
        onSave={mockOnSave}
        task={mockTask}
      />
    );

    expect(screen.queryByText('Edit Task')).not.toBeInTheDocument();
  });

});
