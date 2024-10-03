import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown Component', () => {
  const options = [
    { label: 'Option 1', onClick: jest.fn() },
    { label: 'Option 2', onClick: jest.fn() },
    { label: 'Option 3', onClick: jest.fn() },
  ];

  test('renders the dropdown with the correct label', () => {
    render(<Dropdown label="Select an Option" items={options} />);
    expect(screen.getByText('Select an Option')).toBeInTheDocument();
  });

  test('displays options when clicked', () => {
    render(<Dropdown label="Select an Option" items={options} />);
    fireEvent.click(screen.getByText('Select an Option'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('calls the correct onClick function when an option is selected', () => {
    render(<Dropdown label="Select an Option" items={options} />);
    
    fireEvent.click(screen.getByText('Select an Option')); // Open the dropdown
    fireEvent.click(screen.getByText('Option 1'));
    expect(options[0].onClick).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Select an Option')); // Open the dropdown again
    fireEvent.click(screen.getByText('Option 2'));
    expect(options[1].onClick).toHaveBeenCalled();
  });
});