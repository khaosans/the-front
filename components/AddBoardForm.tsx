'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AddBoardForm({ onAddBoard }: { onAddBoard: (board: any) => void }) {
  const [title, setTitle] = useState('');
  const supabase = createClientComponentClient();

  const addBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const { data, error } = await supabase
      .from('boards')
      .insert({ title })
      .select();

    if (error) {
      console.error('Error adding board:', error);
    } else if (data) {
      onAddBoard(data[0]);
      setTitle('');
    }
  };

  return (
    <form onSubmit={addBoard} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new board title"
        className="p-2 border rounded mr-2"
      />
      <button type="submit" className="p-2 bg-green-500 text-white rounded">
        Add Board
      </button>
    </form>
  );
}
