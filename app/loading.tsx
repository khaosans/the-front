import Spinner from '@/components/ui/Spinner';
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <Spinner size={80} color="#3B82F6" />
    </div>
  );
}