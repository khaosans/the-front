import React from 'react';

interface Message {
  type: 'error' | 'success';
  text: string;
}

export function FormMessage({ type, children }: { type: Message['type']; children: React.ReactNode }) {
  return (
    <div className={`mt-4 p-2 rounded ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
      {children}
    </div>
  );
}
