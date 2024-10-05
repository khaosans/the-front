'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DynamicWallpaper from '@/components/dynamic-wallpaper';

const teams = [
  { name: 'Development', members: 5 },
  { name: 'Design', members: 3 },
  { name: 'Marketing', members: 4 },
  { name: 'Sales', members: 6 },
];

export default function TeamsPage() {
  return (
    <>
      <DynamicWallpaper primaryColor="indigo" secondaryColor="purple" />
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Teams</h1>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Team
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, index) => (
              <Card key={index} className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-400">
                    <Users className="mr-2 h-6 w-6" />
                    {team.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{team.members} members</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}