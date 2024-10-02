import Taskboard from '@/app/tasks/page';
import { Task } from '@/lib/task';
import { render, screen } from '@testing-library/react';

test('renders Taskboard component', () => {
    render(<Taskboard />);
  const element = screen.getByText(/Taskboard/i);
  expect(element).toBeInTheDocument();
});



