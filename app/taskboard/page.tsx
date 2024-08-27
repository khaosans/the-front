'use client';

import dynamic from 'next/dynamic'
import AuthLayout from '../components/AuthLayout'

const DynamicTaskBoard = dynamic(() => import('../components/TaskBoard').then(mod => mod.default), {
  ssr: false,
  loading: () => <p>Loading TaskBoard...</p>
})

export default function TaskBoardPage() {
  return (
    <AuthLayout>
      <main className="p-4">
        <DynamicTaskBoard />
      </main>
    </AuthLayout>
  );
}