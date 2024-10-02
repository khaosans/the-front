import React from 'react';
import { render, screen } from '@testing-library/react';
import Notification from '@/components/Notification';

describe('Notification', () => {
  it('renders the notification message', () => {
    render(<Notification message="Test message" type="success" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
  it('renders the correct class based on type', () => {
    const { container } = render(<Notification message="Test message" type="warning" />);
    expect(container.firstChild).toHaveClass('flex items-center p-4 mb-2 rounded bg-yellow-100');
  });
});