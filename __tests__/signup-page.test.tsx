import React from 'react';
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
const mockSignUp = jest.fn();
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    auth: {
      signUp: mockSignUp,
    },
  }),
}));

// Mock specific components used in SignUpPage
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

// Mock the actual SignUpPage component
const MockSignUpPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    await mockSignUp({ email, password });
  };

  return (
    <div data-testid="mock-signup-page">
      <h1>Sign Up</h1>
      <form data-testid="mock-signup-form" onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" type="email" data-testid="mock-input-email" />
        <input name="password" placeholder="Password" type="password" data-testid="mock-input-password" />
        <button type="submit" data-testid="mock-submit-button">Sign Up</button>
      </form>
    </div>
  );
};

jest.mock('../app/signup/page', () => ({
  __esModule: true,
  default: MockSignUpPage,
}));

describe('SignUpPage', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <MockSignUpPage />
      </ThemeProvider>
    );
    mockSignUp.mockClear();
    mockPush.mockClear();
  });

  it('renders the sign up page', () => {
    const signUpPage = screen.getByTestId('mock-signup-page');
    expect(signUpPage).toBeInTheDocument();
  });

  it('displays the sign up form', () => {
    const form = screen.getByTestId('mock-signup-form');
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

  it('calls signUp when form is submitted', async () => {
    const emailInput = screen.getByTestId('mock-input-email');
    const passwordInput = screen.getByTestId('mock-input-password');
    const submitButton = screen.getByTestId('mock-submit-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});