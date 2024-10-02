'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Settings } from 'lucide-react';
import Notification from '@/components/notification';
import SearchComponent from '@/components/SearchComponent';
import { useRouter } from 'next/navigation';
import Nav from './Nav'; // Import the Nav component

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
          <Nav /> {/* Include the Nav component */}
          <div className="flex items-center space-x-4">
            <SearchComponent />
            <div ref={notificationRef}>
              <button onClick={handleNotificationClick} aria-label="Notifications">
                <Bell className="h-6 w-6" />
              </button>
              {showNotification && notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg">
                  <Notification 
                    message={notifications[notifications.length - 1]} type={'success'} onClose={function (): void {
                      
                    } }                  />
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