"use client"

import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';
import Taskboard from "@/app/taskboard/taskboard";

export default function Board() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Taskboard</h1>
      <Taskboard />
    </div>
  );
}
