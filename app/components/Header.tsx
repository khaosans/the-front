'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [boardName, setBoardName] = useState('Task Board');
  const [isEditingBoardName, setIsEditingBoardName] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndBoard = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('full_name, initials')
          .eq('id', user.id)
          .single();
        setUser({ ...user, ...userData });

        const { data: boardData } = await supabase
          .from('boards')
          .select('name')
          .limit(1)
          .single();
        if (boardData) {
          setBoardName(boardData.name);
        }
      }
    };
    fetchUserAndBoard();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const saveBoardName = async () => {
    const { data, error } = await supabase
      .from('boards')
      .update({ name: boardName })
      .eq('id', 'your_board_id') // Replace with actual board ID
      .select();

    if (error) {
      console.error('Error updating board name:', error);
    } else {
      setIsEditingBoardName(false);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {isEditingBoardName ? (
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            onBlur={saveBoardName}
            onKeyPress={(e) => e.key === 'Enter' && saveBoardName()}
            className="text-2xl font-bold bg-blue-700 text-white p-1 rounded"
            autoFocus
          />
        ) : (
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold cursor-pointer mr-4" 
              onClick={() => setIsEditingBoardName(true)}
            >
              {boardName}
            </h1>
            <Link href="/taskboard" className="text-white hover:text-blue-200">
              Dashboard
            </Link>
          </div>
        )}
        {user && (
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center"
            >
              {user.initials || user.email[0].toUpperCase()}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;