import { handleLogin } from '@/components/session';
import supabase from '../utils/supabaseClient';

jest.mock('../utils/supabaseClient'); // Mock the Supabase client

describe('handleLogin', () => {
    it('should return success when login is successful', async () => {
        (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
            user: { id: '123', email: 'test@example.com' },
            error: null,
        });

        const response = await handleLogin('test@example.com', 'password123');
        expect(response.success).toBe(true);
        expect(response.message).toBe('Login successful');
        expect(response.user).toBeDefined();
    });

    it('should return error message when login fails', async () => {
        (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
            user: null,
            error: { message: 'Invalid credentials' },
        });

        const response = await handleLogin('test@example.com', 'wrongpassword');
        expect(response.success).toBe(false);
        expect(response.message).toBe('Invalid credentials');
    });
});