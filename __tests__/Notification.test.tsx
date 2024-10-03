import { render, screen } from '@testing-library/react';
import Notification from '../components/Notification';

describe('Notification Component', () => {
    it('renders the notification message', () => {
        render(<Notification message="Test notification" />);
        expect(screen.getByText(/test notification/i)).toBeInTheDocument();
    });
});