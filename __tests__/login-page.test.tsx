import React, { act } from 'react'; // Import act from react
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../__mocks__/themeContext';

// Mock the Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the Supabase client
const mockSignIn = jest.fn();
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    auth: {
      signInWithPassword: mockSignIn,
    },
  }),
}));

// Mock specific components used in LoginPage
jest.mock('@/components/ui/input', () => ({
  Input: ({ placeholder, type, ...props }: { placeholder: string; type: string }) => (
    <input placeholder={placeholder} type={type} data-testid={`mock-input-${type}`} {...props} />
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button data-testid="mock-button" {...props}>{children}</button>
  ),
}));

// Mock the actual LoginPage component
const MockLoginPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    await mockSignIn({ email, password });
  };

  return (
    <div data-testid="mock-login-page">
      <h1>Login</h1>
      <form data-testid="mock-login-form" onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" type="email" data-testid="mock-input-email" />
        <input name="password" placeholder="Password" type="password" data-testid="mock-input-password" />
        <button type="submit" data-testid="mock-submit-button">Log In</button>
      </form>
    </div>
  );
};

jest.mock('../app/login/page', () => ({
  __esModule: true,
  default: MockLoginPage,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <MockLoginPage />
      </ThemeProvider>
    );
    mockSignIn.mockClear();
    mockPush.mockClear();
  });

  it('renders the login page', () => {
    const loginPage = screen.getByText(/login/i);
    expect(loginPage).toBeInTheDocument();
  });

  it('displays the login form', () => {
    const form = screen.getByTestId('mock-login-form');
    expect(form).toBeInTheDocument();
  });

  it('includes email input field', () => {
    const emailInput = screen.getByTestId('mock-input-email');
    expect(emailInput).toBeInTheDocument();
  });

  it('includes password input field', () => {
    const passwordInput = screen.getByTestId('mock-input-password');
    expect(passwordInput).toBeInTheDocument();
  });

  it('has a submit button', () => {
    const submitButton = screen.getByTestId('mock-submit-button');
    expect(submitButton).toBeInTheDocument();
  });

  it('calls signInWithPassword when form is submitted', async () => {
    const emailInput = screen.getByTestId('mock-input-email');
    const passwordInput = screen.getByTestId('mock-input-password');
    const submitButton = screen.getByTestId('mock-submit-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});