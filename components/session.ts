import { useState } from 'react';
import { useChat } from 'ai/react'; // Import the useChat hook from the Vercel AI SDK
import supabase from '../utils/supabaseClient'; // Ensure the correct path to your Supabase client

interface LoginResponse {
    success: boolean;
    message: string;
    user?: any; // Replace 'any' with the appropriate user type if available
}

export const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true, message: 'Login successful', user: data.user }; // Access user from data
};

const SessionComponent = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat(); // Use the useChat hook

    const [email, setEmail] = useState<string>(''); // Email for login
    const [password, setPassword] = useState<string>(''); // Password for login
    const [loginMessage, setLoginMessage] = useState<string | null>(null);

    const handleLoginSubmit = async () => {
        const loginResponse = await handleLogin(email, password);
        setLoginMessage(loginResponse.message); // Update login message based on response
    };

    return (
        <div>
            <h2>Chat with Ollama</h2>
            <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
                {messages.map((m) => (
                    <div key={m.id} className="whitespace-pre-wrap">
                        {m.role === 'user' ? 'User: ' : 'AI: '}
                        {m.content}
                    </div>
                ))}
                <form
                    onSubmit={handleSubmit}
                    className="fixed bottom-0 w-full max-w-md mb-8 border border-gray-300 rounded shadow-xl"
                >
                    <input
                        className="w-full p-2"
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                    />
                </form>
            </div>

            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                placeholder="Password"
            />
            <button onClick={handleLoginSubmit}>Login</button>
            {loginMessage && <div>{loginMessage}</div>} {/* Display login message */}
        </div>
    );
};

export default SessionComponent;