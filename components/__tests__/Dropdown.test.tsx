import { render, screen } from '@testing-library/react';
import Dropdown from '../Dropdown'; // Updated import path

const options = [
    { label: 'Option 1', onClick: jest.fn() },
    { label: 'Option 2', onClick: jest.fn() },
];

describe('Dropdown Component', () => {
    test('renders the dropdown with the correct label', () => {
        render(<Dropdown label="Select an Option" items={options} />);
        
        // Check if the dropdown label is rendered
        const dropdownLabels = screen.getAllByText('Select an Option'); // Updated query
        expect(dropdownLabels.length).toBeGreaterThan(0); // Check if at least one element is found
        expect(dropdownLabels[0]).toBeInTheDocument(); // Check the first element
    });

    test('renders dropdown items', () => {
        render(<Dropdown label="Select an Option" items={options} />);
        
        // Check if dropdown items are rendered
        options.forEach(option => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });
});