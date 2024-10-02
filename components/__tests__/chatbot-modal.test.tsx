import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatbotModal from '../ChatbotModal';

// Mock the dialog component
jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) => open ? <div>{children}</div> : null,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  DialogFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the scroll area component
jest.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('ChatbotModal', () => {
  it('renders when isOpen is true', () => {
    render(<ChatbotModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Chatbot Assistant')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ChatbotModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText('Chatbot Assistant')).not.toBeInTheDocument();
  });

  it('allows user to input and send messages', () => {
    render(<ChatbotModal isOpen={true} onClose={() => {}} />);
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello, chatbot!' } });
    fireEvent.click(sendButton);

    expect(screen.getByText('Hello, chatbot!')).toBeInTheDocument();
  });

  it('displays bot response after user message', async () => {
    jest.useFakeTimers();
    render(<ChatbotModal isOpen={true} onClose={() => {}} />);
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello, chatbot!' } });
    fireEvent.click(sendButton);

    jest.advanceTimersByTime(1000);

    expect(await screen.findByText("I'm a mock response from the chatbot!")).toBeInTheDocument();
    jest.useRealTimers();
  });
});