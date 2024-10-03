'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

// Static in-memory data for members
const members = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
];

const MembersPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Team Members</h1>
      <Button variant="outline" className="mb-4">
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Member
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {member.email}</p>
              <p>Role: {member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
