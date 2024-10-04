import supabase from '../utils/supabaseClient'; // Ensure the correct path to your Supabase client

interface LoginResponse {
    success: boolean;
    message: string;
    user?: any; // Replace 'any' with the appropriate user type if available
}

export const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return { success: false, message: error.message };
        }

        return { success: true, message: 'Login successful', user: data.user };
    } catch (error) {
        return { success: false, message: 'An unexpected error occurred' };
    }
};