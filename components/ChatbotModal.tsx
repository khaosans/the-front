import { useState } from 'react';
import ollama from '../lib/ollama'; // Ensure this path is correct

const ChatBotModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);

        const response = await getChatCompletion([input]); // Ensure this function is defined or imported
        const aiMessage = { role: 'ai', content: response };
        setMessages((prev) => [...prev, aiMessage]);
        setInput(''); // Clear the input field
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Chat with Ollama</h2>
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.role}>
                            {msg.role === 'user' ? 'User: ' : 'AI: '}
                            {msg.content}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatBotModal;