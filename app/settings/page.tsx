'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Bell, Lock, Palette } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DynamicWallpaper from '@/components/dynamic-wallpaper';

export default function SettingsPage() {
  return (
    <>
      <DynamicWallpaper primaryColor="amber" secondaryColor="orange" />
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Settings</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-400">
                  <User className="mr-2 h-6 w-6" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">Edit Profile</Button>
              </CardContent>
            </Card>
            {/* Repeat for other cards */}
          </div>
        </div>
      </div>
    </>
  );
}