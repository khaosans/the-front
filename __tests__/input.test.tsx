import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Input} from "@/components/ui/input";

describe('Input Component', () => {
  it('renders the input with the correct placeholder', () => {
    render(<Input placeholder="Enter text" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when the value changes', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Enter text" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
