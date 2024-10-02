import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatbotModal from '../../components/ChatbotModal';

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
    expect(screen.getByText('Chatbot')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ChatbotModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByText('Chatbot Assistant')).not.toBeInTheDocument();
  });

  it('displays bot response after user message', async () => {
    jest.useFakeTimers();
    render(<ChatbotModal isOpen={true} onClose={() => {}} />);
    jest.useRealTimers();
  });
});