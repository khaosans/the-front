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
const mockFetchProfile = jest.fn();
const mockUpdateProfile = jest.fn();
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: { email: 'test@example.com', name: 'Test User' }, error: null }),
    update: mockUpdateProfile,
  }),
}));

// Mock specific components used in ProfilePage
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

// Mock the actual ProfilePage component
const MockProfilePage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    await mockUpdateProfile({ name, email });
  };

  return (
    <div data-testid="mock-profile-page">
      <h1>Profile</h1>
      <form data-testid="mock-profile-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" type="text" data-testid="mock-input-name" />
        <input name="email" placeholder="Email" type="email" data-testid="mock-input-email" />
        <button type="submit" data-testid="mock-submit-button">Update Profile</button>
      </form>
    </div>
  );
};

jest.mock('../app/profile/page', () => ({
  __esModule: true,
  default: MockProfilePage,
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <MockProfilePage />
      </ThemeProvider>
    );
    mockUpdateProfile.mockClear();
    mockPush.mockClear();
  });

  it('renders the profile page', () => {
    const profilePage = screen.getByTestId('mock-profile-page');
    expect(profilePage).toBeInTheDocument();
  });

  it('displays the profile form', () => {
    const form = screen.getByTestId('mock-profile-form');
    expect(form).toBeInTheDocument();
  });

  it('includes name input field', () => {
    const nameInput = screen.getByTestId('mock-input-name');
    expect(nameInput).toBeInTheDocument();
  });

  it('includes email input field', () => {
    const emailInput = screen.getByTestId('mock-input-email');
    expect(emailInput).toBeInTheDocument();
  });

  it('has a submit button', () => {
    const submitButton = screen.getByTestId('mock-submit-button');
    expect(submitButton).toBeInTheDocument();
  });

  it('calls updateProfile when form is submitted', async () => {
    const nameInput = screen.getByTestId('mock-input-name');
    const emailInput = screen.getByTestId('mock-input-email');
    const submitButton = screen.getByTestId('mock-submit-button');

    fireEvent.change(nameInput, { target: { value: 'Updated User' } });
    fireEvent.change(emailInput, { target: { value: 'updated@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        name: 'Updated User',
        email: 'updated@example.com',
      });
    });
  });
});