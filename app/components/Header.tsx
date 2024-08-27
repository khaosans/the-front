'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('full_name, initials')
          .eq('id', user.id)
          .single();
        setUser({ ...user, ...userData });
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'} p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="mr-4 text-white focus:outline-none"
            >
              ☰
            </button>
            <Link href="/taskboard" className="text-white hover:text-blue-200">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded mr-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-500'}`}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
            {user && (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`rounded-full w-10 h-10 flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-500'}`}
                >
                  {user.initials || user.email[0].toUpperCase()}
                </button>
                {isDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                    <Link href="/profile" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>Profile</Link>
                    <Link href="/settings" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>Settings</Link>
                    <button 
                      onClick={handleSignOut}
                      className={`block w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'text-red-400 hover:bg-gray-600' : 'text-red-600 hover:bg-gray-100'}`}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Left Navigation Bar */}
      <div className={`fixed left-0 top-0 h-full w-64 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-4 transform ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
        <button
          onClick={() => setIsNavOpen(false)}
          className={`absolute top-4 right-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          ✕
        </button>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <Link href="/boards" className={`block py-2 px-4 rounded ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-200'}`}>
                Boards
              </Link>
            </li>
            <li>
              <Link href="/members" className={`block py-2 px-4 rounded ${theme === 'dark' ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-200'}`}>
                Members
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Overlay to close nav when clicking outside */}
      {isNavOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsNavOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;