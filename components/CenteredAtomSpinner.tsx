import React from 'react';
import Spinner from '@/components/ui/Spinner'
;

const CenteredAtomSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <Spinner size={80} color="#3B82F6" />
    </div>
  );
};

export default CenteredAtomSpinner;