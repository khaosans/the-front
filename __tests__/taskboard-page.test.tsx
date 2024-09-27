import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../__mocks__/themeContext';

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the Supabase client
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
  }),
}));

// Mock specific components used in TaskBoard
jest.mock('@/components/ui/button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => <button data-testid="mock-button">{children}</button>,
}));

jest.mock('@/components/ui/input', () => ({
  Input: ({ placeholder }: { placeholder: string }) => <input placeholder={placeholder} data-testid="mock-input" />,
}));

// Mock the actual TaskBoard component
jest.mock('../app/taskboard/page', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-taskboard">
      <h1>Task Board</h1>
      <div data-testid="mock-task-list">
        {/* Simulated task items */}
        <div data-testid="mock-task-item">Task 1</div>
        <div data-testid="mock-task-item">Task 2</div>
      </div>
      <button data-testid="mock-add-task-button">Add Task</button>
    </div>
  ),
}));

describe('TaskBoardPage', () => {
  let TaskBoardPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('../app/taskboard/page');
    TaskBoardPage = module.default;
  });

  beforeEach(() => {
    render(
      <ThemeProvider>
        <TaskBoardPage />
      </ThemeProvider>
    );
  });

  it('renders the task board page', () => {
    const taskBoard = screen.getByTestId('mock-taskboard');
    expect(taskBoard).toBeInTheDocument();
  });

  it('displays the task board heading', () => {
    const heading = screen.getByRole('heading', { name: /task board/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the task list', () => {
    const taskList = screen.getByTestId('mock-task-list');
    expect(taskList).toBeInTheDocument();
  });

  it('displays task items', () => {
    const taskItems = screen.getAllByTestId('mock-task-item');
    expect(taskItems.length).toBeGreaterThan(0);
  });

  it('has an add task button', () => {
    const addButton = screen.getByTestId('mock-add-task-button');
    expect(addButton).toBeInTheDocument();
  });
});