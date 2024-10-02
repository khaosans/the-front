'use client';

import { useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ConsoleHub: React.FC = () => {
  const [data] = useState([
    { name: 'Completed', value: 40 },
    { name: 'In Progress', value: 30 },
    { name: 'To Do', value: 30 },
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Your Console Hub</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Manage your tasks, projects, and teams efficiently.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
        <Link href="/dashboard" className="bg-white p-4 rounded shadow hover:shadow-lg transition">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Overview of tasks and projects.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/teams" className="bg-white p-4 rounded shadow hover:shadow-lg transition">
          <Card>
            <CardHeader>
              <CardTitle>Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage your teams and their members.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/members" className="bg-white p-4 rounded shadow hover:shadow-lg transition">
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View and manage all members.</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Task Status Distribution</h2>
      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#10B981', '#3B82F6', '#EF4444'][index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">"Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." - Albert Schweitzer</h3>
      </div>
    </main>
  );
};

export default ConsoleHub;
