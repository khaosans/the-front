'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import Notification from './Notification';
import SearchComponent from './SearchComponent';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleSettingsClick = () => {
    router.push('/settings');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotification(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">QuantumLabs</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
              <li><Link href="/tasks" className="hover:text-gray-300">Tasks</Link></li>
              <li><Link href="/taskboard" className="hover:text-gray-300">Taskboard</Link></li>
              <li><Link href="/projects" className="hover:text-gray-300">Projects</Link></li>
              <li><Link href="/teams" className="hover:text-gray-300">Teams</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <SearchComponent />
            <div ref={notificationRef}>
              <button onClick={handleNotificationClick} aria-label="Notifications">
                <Bell className="h-6 w-6" />
              </button>
              {showNotification && notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg">
                  <Notification 
                    message={notifications[notifications.length - 1]} 
                    onClose={handleCloseNotification} 
                  />
                </div>
              )}
            </div>
            <button onClick={handleSettingsClick} aria-label="Settings">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;