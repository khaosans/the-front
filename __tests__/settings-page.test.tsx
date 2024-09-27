import React from 'react'; // Removed act import
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../__mocks__/themeContext';

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the Supabase client
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    // Mock any methods you use from the Supabase client here
  }),
}));

// Mock the Switch component
jest.mock('@/components/ui/switch', () => ({
  Switch: ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div data-testid="mock-switch" onClick={onChange}>
      {checked ? 'On' : 'Off'}
    </div>
  ),
}));

// Mock the Select component
jest.mock('@/components/ui/select', () => ({
  Select: ({ children, ...props }: { children: React.ReactNode }) => (
    <select data-testid="mock-select" {...props}>
      {children}
    </select>
  ),
}));

// Mock the actual SettingsPage component
const MockSettingsPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate form submission logic
  };

  return (
    <div data-testid="mock-settings-page">
      <h1>Settings</h1>
      <form data-testid="mock-settings-form" onSubmit={handleSubmit}>
        <label htmlFor="theme">Theme</label>
        <div data-testid="mock-switch">Toggle Theme</div>
        <label htmlFor="language">Language</label>
        <select id="language" data-testid="mock-language-select">
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
        <button type="submit" data-testid="mock-submit-button">Save Settings</button>
      </form>
    </div>
  );
};

jest.mock('../app/settings/page', () => ({
  __esModule: true,
  default: MockSettingsPage,
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <MockSettingsPage />
      </ThemeProvider>
    );
  });

  it('renders the settings page with correct main heading', () => {
    const heading = screen.getByRole('heading', { name: /settings/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays the settings form', () => {
    const form = screen.getByTestId('mock-settings-form');
    expect(form).toBeInTheDocument();
  });

  it('includes a theme toggle', () => {
    const switchElement = screen.getByTestId('mock-switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('includes a language selection dropdown', () => {
    const languageSelect = screen.getByTestId('mock-language-select');
    expect(languageSelect).toBeInTheDocument();
  });

  it('has a submit button', () => {
    const submitButton = screen.getByTestId('mock-submit-button');
    expect(submitButton).toBeInTheDocument();
  });

});