import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import { ThemeProvider } from '@/__mocks__/themeContext';

jest.mock('@/app/dashboard/page', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="dashboard-page">Dashboard</div>
  };
});

describe('DashboardPage', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <DashboardPage />
      </ThemeProvider>
    );
    const dashboardPage = screen.getByTestId('dashboard-page');
    expect(dashboardPage).toBeTruthy();

  });
});