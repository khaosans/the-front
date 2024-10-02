import { render, screen } from '@testing-library/react';
import Taskboard from '../../app/components/Taskboard';

test('renders Taskboard component', () => {
  render(<Taskboard />);
  const element = screen.getByText(/Taskboard/i);
  expect(element).toBeInTheDocument();
});



