'use client';

import React from 'react';

interface ChatbotModalProps {
    onClose: () => void; // Define the type for onClose
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose }) => {
    return (
        <div>
            {/* Modal content here */}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ChatbotModal;