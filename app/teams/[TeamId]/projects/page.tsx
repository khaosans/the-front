'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const { teamId } = router.query; // Get the team ID from the URL

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Projects for Team: {teamId}</h1>
      <Button variant="outline" className="mb-4">
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href={`/projects/1`}>
          <Card>
            <CardHeader>
              <CardTitle>Project A</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Description of Project A</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/projects/2`}>
          <Card>
            <CardHeader>
              <CardTitle>Project B</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Description of Project B</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default ProjectsPage;