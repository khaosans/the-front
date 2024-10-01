import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../__mocks__/themeContext';
import TeamsPage from '../app/teams/page';

// Mock the necessary components and hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

describe('TeamsPage', () => {
  it('renders the teams page', () => {
    render(
      <ThemeProvider>
        <TeamsPage />
      </ThemeProvider>
    );

    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search teams...')).toBeInTheDocument();
    expect(screen.getByText('New Team')).toBeInTheDocument();
  });

  // Add more tests as needed
});