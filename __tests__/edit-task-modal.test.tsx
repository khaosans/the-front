import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditTaskModal } from '@/app/taskboard/edit-task-modal';
import { ThemeProvider } from '@/app/contexts/ThemeContext';

// Remove the renderer import as we're not using snapshots for now
// import renderer from 'react-test-renderer';

// Mock the Task type
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  comments: number;
}

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock the UI components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: any) => open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }: any) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }: any) => <div data-testid="dialog-title">{children}</div>,
  DialogFooter: ({ children }: any) => <div data-testid="dialog-footer">{children}</div>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

jest.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children }: any) => <label>{children}</label>,
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, defaultValue }: any) => (
    <select onChange={(e) => onValueChange(e.target.value)} defaultValue={defaultValue}>
      {children}
    </select>
  ),
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ children, value }: any) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: any) => <>{children}</>,
  SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
}));

// Mock the Textarea component
jest.mock('@/app/taskboard/edit-task-modal', () => {
  const ActualEditTaskModal = jest.requireActual('@/app/taskboard/edit-task-modal').EditTaskModal;
  return {
    ...jest.requireActual('@/app/taskboard/edit-task-modal'),
    EditTaskModal: (props: any) => <ActualEditTaskModal {...props} />,
    Textarea: ({ onChange, name, className, id, value }: any) => (
      <textarea onChange={onChange} name={name} className={className} id={id} value={value} />
    ),
  };
});

describe('EditTaskModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockTask: Task = {
    id: '1',
    title: 'Initial Task',
    description: 'This is an initial task.',
    priority: 'medium',
    comments: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <ThemeProvider>
        <EditTaskModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          task={mockTask}
        />
      </ThemeProvider>
    );

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Initial Task')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ThemeProvider>
        <EditTaskModal
          isOpen={false}
          onClose={mockOnClose}
          onSave={mockOnSave}
          task={mockTask}
        />
      </ThemeProvider>
    );

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('calls onSave and onClose when save button is clicked', () => {
    render(
      <ThemeProvider>
        <EditTaskModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          task={mockTask}
        />
      </ThemeProvider>
    );

    fireEvent.change(screen.getByDisplayValue('Initial Task'), {
      target: { value: 'Updated Task' },
    });
    fireEvent.click(screen.getByText('Save changes'));

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockTask,
      title: 'Updated Task',
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  // Remove the test for the cancel button as it doesn't exist in the component
});
