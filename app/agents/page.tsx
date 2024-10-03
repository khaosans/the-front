'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';
import CenteredAtomSpinner from "@/components/CenteredAtomSpinner"; // Ensure this path is correct

const agents = [
  { name: 'Agent 1', status: 'Active', tasksCompleted: 120, efficiency: 95, seniority: 'Senior' },
  { name: 'Agent 2', status: 'Idle', tasksCompleted: 80, efficiency: 88, seniority: 'Mid-Level' },
  { name: 'Agent 3', status: 'Active', tasksCompleted: 150, efficiency: 92, seniority: 'Junior' },
  { name: 'Agent 4', status: 'Maintenance', tasksCompleted: 50, efficiency: 79, seniority: 'Senior' },
];

const AgentsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CenteredAtomSpinner />;
  }

  function getSeniorityColor(seniority: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Agents Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Agents Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tasks Completed</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Seniority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <Badge variant={agent.status === 'Active' ? 'default' : agent.status === 'Idle' ? 'secondary' : 'destructive'}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{agent.tasksCompleted}</TableCell>
                  <TableCell>{agent.efficiency}%</TableCell>
                  <TableCell>
                    <Badge className={`text-white ${getSeniorityColor(agent.seniority)}`}>
                      {agent.seniority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentsPage;