import { render, screen } from '@testing-library/react';
import Dropdown from '../components/Dropdown'; // Adjust the import path as necessary

const options = [
    { label: 'Option 1', onClick: jest.fn() },
    { label: 'Option 2', onClick: jest.fn() },
];

describe('Dropdown Component Test', () => {
   
   
    test('renders dropdown items', () => {
        render(<Dropdown label="Select an Option" items={options} />);
        
        options.forEach(option => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });
});