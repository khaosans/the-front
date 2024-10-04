import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '@/app/dashboard/page';
import Notification from '@/components/Notification';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('DashboardPage', () => {
  it('renders dashboard components', () => {
    render(<DashboardPage />);
    // Add your assertions here
  });
});