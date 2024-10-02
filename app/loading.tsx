import Spinner from '@/components/ui/spinner';
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <Spinner  />
    </div>
  );
}