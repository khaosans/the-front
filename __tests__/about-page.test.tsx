import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../__mocks__/themeContext';

// Mock any Next.js specific modules used in the AboutPage
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('AboutPage', () => {
  let AboutPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('../app/about/page');
    AboutPage = module.default;
  });

  beforeEach(() => {
    act(() => {
      render(
        <ThemeProvider>
          <AboutPage />
        </ThemeProvider>
      );
    });
  });

  it('renders the about page with correct heading', () => {
    const heading = screen.getByRole('heading', { name: /about us/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  // Add more tests based on your actual AboutPage content
});
