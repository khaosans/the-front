import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null); // Reset error state before submission

        try {
            const { error } = await supabase.auth.signIn({
                email,
                password,
            });

            if (error) throw error; // Throw error if login fails

            // Handle successful login (e.g., redirect or show a success message)
            console.log('User logged in successfully');
        } catch (err) {
            // Log the full error object for debugging
            console.error('Login error:', err);
            if (err instanceof Error) {
                setError(err.message || 'Failed to log in. Please try again.');
            } else {
                setError('Invalid API key or server error.');
            }
        }
    };

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/auth/v1/callback', // Update this to your actual callback URL
            },
        });

        if (error) {
            console.error('Google sign-in error:', error);
            setError(error.message || 'Failed to sign in with Google.');
        }
    };

    return (
        <div>
            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Render the form fields only on the client */}
                    {isClient && (
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <button type="submit">Sign in</button>
                        </div>
                    )}
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
            <div>
                <p>Or continue with:</p>
                <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            </div>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
}

export default LoginPage;