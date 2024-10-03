import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import Notification from '@/components/Notification'; // Corrected casing

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock the Notification component
jest.mock('@/components/Notification', () => ({ // Corrected casing
  __esModule: true,
  default: ({ message, type, onClose }: any) => (
    <div data-testid="notification" className={`notification-${type}`}>
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('DashboardPage', () => {
  
  it('renders the dashboard after loading', async () => {
    jest.useFakeTimers();
    render(<DashboardPage />);
    
    // Fast-forward the timer
    jest.runAllTimers();


    expect(await screen.findByText('Dashboard')).toBeInTheDocument();
  });

});