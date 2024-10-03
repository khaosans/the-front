import SignUp from '@/components/sign-up';
import { render, screen } from '@testing-library/react';

//create mocks for sign up
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

//mock the useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));




describe('SignUp Component', () => {
    it('renders the sign-up form', () => {
        render(<SignUp />);

        expect(screen.getAllByText(/sign up/i)).toHaveLength(2);
    });
});