import { useState } from 'react';
import { sendMessageToOllama } from '../lib/chat_models'; // Ensure this import matches the export in lib/chat_models.ts
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
    const [message, setMessage] = useState<string>(''); // Single message input
    const [response, setResponse] = useState<string | null>(null);
    const [email, setEmail] = useState<string>(''); // Email for login
    const [password, setPassword] = useState<string>(''); // Password for login
    const [loginMessage, setLoginMessage] = useState<string | null>(null);

    const handleSendMessage = async () => {
        const result = await sendMessageToOllama([message]); // Send message as an array
        setResponse(result); // Update the response state with the result
    };

    const handleLoginSubmit = async () => {
        const loginResponse = await handleLogin(email, password);
        setLoginMessage(loginResponse.message); // Update login message based on response
    };

    return (
        <div>
            <h2>Chat with Ollama</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Update message state
                placeholder="Type your message"
            />
            <button onClick={handleSendMessage}>Send</button>
            {response && <div>Response: {response}</div>}

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