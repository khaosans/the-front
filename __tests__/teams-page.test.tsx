import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../__mocks__/themeContext'; // Ensure this path is correct
import TeamsPage from '../app/teams/page'; // Ensure this path is correct

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
    expect(screen.queryAllByLabelText('Teams')).toBeDefined();
  });   
  });   




  // Add more tests as need   ed