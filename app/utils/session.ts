import { supabase } from '@/utils/supabaseClient'; // Ensure this path is correct

export const getSession = async () => {
    // Check if supabase is defined
    if (!supabase || !supabase.auth) {
        console.error('Supabase is not initialized correctly.');
        return null;
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Failed to get session:', error);
        return null;
    }
    return data.session; // Ensure you're returning the session correctly
};

// New login function
export const login = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Login failed:', error);
        return null;
    }
    return user; // Return user object on successful login
};