'use client';

import React, { useState } from 'react';
import ChatbotModal from '@/components/ChatbotModal'; // Updated import to use ChatbotModal

const ChatPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true); // Open the modal by default

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {isModalOpen && <ChatbotModal onClose={handleClose} />} {/* Updated to render ChatbotModal */}
        </div>
    );
};

export default ChatPage;