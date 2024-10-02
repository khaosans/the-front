import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditTaskModal from '../components/edit-task-modal';

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <EditTaskModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        initialTask={'Initial Task'}
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
        initialTask={'Initial Task'}
      />
    );

    expect(screen.queryByText('Edit Task')).not.toBeInTheDocument();
  });

  it('calls onSave and onClose when save button is clicked', () => {
    render(
      <EditTaskModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        initialTask={'Initial Task'}
      />
    );

    fireEvent.change(screen.getByDisplayValue('Initial Task'), {
      target: { value: 'Updated Task' },
    });
    fireEvent.click(screen.getByText('Save'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(
      <EditTaskModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave} initialTask={''}      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
