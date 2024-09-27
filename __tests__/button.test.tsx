import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/button';
import { ThemeProvider } from '../__mocks__/themeContext';
describe('Button component', () => {
  it('renders the button with correct text and calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <ThemeProvider>
        <Button onClick={mockOnClick}>Click me</Button>
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
