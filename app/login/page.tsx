'use client';

import dynamic from 'next/dynamic'

const DynamicLogin = dynamic(() => import('../components/Login'), {
  ssr: false,
})

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Task Board</h1>
      <DynamicLogin />
    </main>
  )
}