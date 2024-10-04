import React from 'react';
import { render } from '@testing-library/react';
import SomeComponent from '../components/SomeComponent';
import { getResponse } from '../lib/ollama';

jest.mock('../lib/ollama', () => ({
  getResponse: jest.fn().mockResolvedValue('Mocked response'),
}));

describe('SomeComponent', () => {
  it('renders response from Langchain', async () => {
    const { findByText } = render(<SomeComponent />);
    const responseElement = await findByText('Mocked response');
    expect(responseElement).toBeInTheDocument();
  });
});