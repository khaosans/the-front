'use client'

import { useSearchParams } from 'next/navigation'
import ChatBot from '@/components/ui/ChatBot';

const ChatPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    return (
        <div>
            <h1>Chat ID: {id}</h1>
            <ChatBot chatId={id || undefined} />
        </div>
    );
};

export default ChatPage;
