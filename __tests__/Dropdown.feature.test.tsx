import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../components/Dropdown'; // Adjust the import path as necessary

const options = [
    { label: 'Option 1', onClick: jest.fn() },
    { label: 'Option 2', onClick: jest.fn() },
];

describe('Dropdown Component Feature Test', () => {
    test('opens dropdown and selects an option', () => {
        render(<Dropdown label="Select an Option" items={options} />);
        
        // Simulate a click to open the dropdown
        // Check if dropdown items are rendered
        options.forEach(option => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });

        // Simulate clicking on the first option
        fireEvent.click(screen.getByText('Option 1'));
        expect(options[0].onClick).toHaveBeenCalled();
    });
});