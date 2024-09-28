"use client"

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';
import ProjectBoard from '@/components/ProjectBoard'; // Ensure this path is correct

export default function Taskboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Taskboard</h1>
      <ProjectBoard />
    </div>
  );
}
