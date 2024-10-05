'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, CheckCircle, Clock } from 'lucide-react';
import DynamicWallpaper from '@/components/dynamic-wallpaper';

export default function DashboardPage() {
  return (
    <>
      <DynamicWallpaper primaryColor="green" secondaryColor="blue" />
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-green-400">
                  <BarChart className="mr-2 h-6 w-6" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">12</p>
              </CardContent>
            </Card>
            {/* Repeat for other cards */}
          </div>
        </div>
      </div>
    </>
  );
}