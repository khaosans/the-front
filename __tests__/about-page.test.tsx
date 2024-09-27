import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from '../app/about/page';
import { ThemeProvider } from '../__mocks__/themeContext';

describe('AboutPage', () => {
  it('renders the about page with correct content', () => {
    render(
      <ThemeProvider>
        <AboutPage />
      </ThemeProvider>
    );

    const heading = screen.getByRole('heading', { name: /about us/i });
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(/Welcome to our about page/i);
    expect(paragraph).toBeInTheDocument();

    expect(screen.getByText(/We are a company dedicated to creating amazing products/i)).toBeInTheDocument();
  });
});