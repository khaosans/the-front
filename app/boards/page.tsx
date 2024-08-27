'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Link from 'next/link';

const BoardsPage = () => {
  const [boards, setBoards] = useState<any[]>([]);
  const [newBoardName, setNewBoardName] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const { data, error } = await supabase.from('boards').select('*');
    if (error) {
      console.error('Error fetching boards:', error);
    } else {
      setBoards(data || []);
    }
  };

  const createBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;

    const { data, error } = await supabase
      .from('boards')
      .insert({ name: newBoardName })
      .select()
      .single();

    if (error) {
      console.error('Error creating board:', error);
    } else {
      setBoards([...boards, data]);
      setNewBoardName('');
    }
  };

  const deleteBoard = async (boardId: string) => {
    const { error } = await supabase
      .from('boards')
      .delete()
      .eq('id', boardId);

    if (error) {
      console.error('Error deleting board:', error);
    } else {
      setBoards(boards.filter(board => board.id !== boardId));
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-4">My Boards</h1>
        <form onSubmit={createBoard} className="mb-4">
          <input
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            placeholder="New board name"
            className="mr-2 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create New Board
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <div key={board.id} className="border rounded p-4 flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-2">{board.name}</h2>
              <div className="flex justify-between">
                <Link href={`/taskboard?board=${board.id}`} className="text-blue-500 hover:underline">
                  Open Board
                </Link>
                <button 
                  onClick={() => deleteBoard(board.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default BoardsPage;