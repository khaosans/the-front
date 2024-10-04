import ChatBot from '@/components/ChatBot';
import ChatHistory from '../ChatHistory';

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <ChatHistory/>
      </div>
      <div className="w-3/4">
        <ChatBot />
      </div>
    </div>
  );
}