import ForgotPassword from '@/app/forgot-password/page';
import { render, screen } from '@testing-library/react';

describe('ForgotPassword Component', () => {
    it('renders the forgot password form', () => {
        render(<ForgotPassword />);
        expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    });
});