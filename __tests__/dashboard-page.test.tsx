import React from 'react';
import { render } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import { ThemeProvider } from '@/__mocks__/themeContext';

describe('DashboardPage', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <DashboardPage />
      </ThemeProvider>
    );
  });
});