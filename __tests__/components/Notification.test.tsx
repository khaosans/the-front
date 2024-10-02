import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notification from '@/components/notification';

describe('Notification Component', () => {
  it('renders the notification with the correct message and type', () => {
    const message = 'Test notification';
    render(<Notification message={message} type="success" onClose={() => {}} />);

    expect(screen.getByText(message)).toBeInTheDocument();
    const notificationElement = screen.getByText(message).parentElement;
    expect(notificationElement).toHaveClass('bg-green-500');
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(<Notification message="Close me" onClose={onClose} />);

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies the correct background color based on type', () => {
    const { rerender } = render(
      <Notification message="Info message" type="info" onClose={() => {}} />
    );

    let notificationElement = screen.getByText('Info message').parentElement;
    expect(notificationElement).toHaveClass('bg-blue-500');

    rerender(<Notification message="Error message" type="error" onClose={() => {}} />);
    notificationElement = screen.getByText('Error message').parentElement;
    expect(notificationElement).toHaveClass('bg-red-500');
  });
});