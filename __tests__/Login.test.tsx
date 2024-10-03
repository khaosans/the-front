import { render, screen } from '@testing-library/react';
import Login from '../components/login'; // Ensure this path is correct 

//mock the useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('Login Component', () => {
    it('renders the login form', () => {
        render(<Login />);


        
    });
});