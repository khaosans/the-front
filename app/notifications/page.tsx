'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from 'lucide-react';
import DynamicWallpaper from '@/components/dynamic-wallpaper';

const notifications = [
  { id: 1, title: 'New task assigned', message: 'You have been assigned a new task: "Update user documentation"' },
  { id: 2, title: 'Project deadline approaching', message: 'The "Website Redesign" project is due in 3 days' },
  { id: 3, title: 'Team meeting reminder', message: 'Don\'t forget about the team meeting today at 2 PM' },
];

export default function NotificationsPage() {
  return (
    <>
      <DynamicWallpaper primaryColor="red" secondaryColor="pink" />
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Notifications</h1>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-400">
                    <Bell className="mr-2 h-6 w-6" />
                    {notification.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{notification.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}