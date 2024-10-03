import { render, screen } from '@testing-library/react';
import Dropdown from '../Dropdown'; // Updated import path

const options = [
    { label: 'Option 1', onClick: jest.fn() },
    { label: 'Option 2', onClick: jest.fn() },
];

describe('Dropdown Component', () => {
    test('renders the dropdown with the correct label', () => {
        render(<Dropdown label="Select an Option" items={options} />);
        const dropdownLabels = screen.getAllByText('Select an Option'); // Updated query
        expect(dropdownLabels.length).toBeGreaterThan(0); // Check if at least one element is found
        expect(dropdownLabels[0]).toBeInTheDocument(); // Check the first element
    });

    // Additional tests can be added here
});