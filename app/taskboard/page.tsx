'use client';

import dynamic from 'next/dynamic';
import AuthenticatedLayout from '@/components/AuthenticatedLayout'; // Ensure this import is correct

const DynamicTaskBoard = dynamic(() => import('../components/TaskBoard').then(mod => mod.default), {
  ssr: false,
  loading: () => <p>Loading TaskBoard...</p>
});

export default function TaskBoardPage() {
  return (
    <AuthenticatedLayout>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Project Board</h1>
        <DynamicTaskBoard />
      </main>
    </AuthenticatedLayout>
  );
}
