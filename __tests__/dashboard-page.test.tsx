import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardPage from '../app/dashboard/page'; // Adjust the import path as necessary
import { ToastContainer } from 'react-toastify'; // Ensure this is imported correctly

// Mock the ToastContainer to avoid rendering issues during tests
jest.mock('react-toastify', () => ({
    ToastContainer: () => <div>Mocked ToastContainer</div>,
}));

describe('DashboardPage', () => {
    test('renders dashboard title', () => {
        render(<DashboardPage />);
        const titleElement = screen.getByText(/Dashboard/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders projects overview', () => {
        render(<DashboardPage />);
        const projectsOverviewElement = screen.getByText(/Projects Overview/i);
        expect(projectsOverviewElement).toBeInTheDocument();
    });

    test('adds a new task', () => {
        render(<DashboardPage />);
        const addButton = screen.getByRole('button', { name: /Add New Project/i });
        fireEvent.click(addButton);
        // Add assertions to check if the new task is added correctly
    });

    // Add more tests as needed
});