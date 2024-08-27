'use client';

import dynamic from 'next/dynamic'
import AuthenticatedLayout from '../components/AuthenticatedLayout'

const DynamicTaskBoard = dynamic(() => import('../components/TaskBoard').then(mod => mod.default), {
  ssr: false,
  loading: () => <p>Loading TaskBoard...</p>
})

export default function TaskBoardPage() {
  return (
    <AuthenticatedLayout>
      <main className="p-4">
        <DynamicTaskBoard />
      </main>
    </AuthenticatedLayout>
  );
}