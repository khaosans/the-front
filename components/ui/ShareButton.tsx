'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

export default function ShareButton({ chatId }: { chatId: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/chat/${chatId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={handleShare} variant="outline">
      {copied ? 'Copied!' : <Share2 className="w-4 h-4" />}
    </Button>
  );
}