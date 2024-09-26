'use client';


import dynamic from "next/dynamic";
import React from "react";
import Layout from "@/app/layout";

const DynamicTaskBoard = dynamic(() => import('../TaskBoard').then(mod => mod.default), {
  ssr: false,
  loading: () => <p>Loading TaskBoard...</p>
});


export default function TaskBoardPage() {
  return (
    <Layout>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Project Board</h1>
        <DynamicTaskBoard />
      </main>
    </Layout>
  );
}
