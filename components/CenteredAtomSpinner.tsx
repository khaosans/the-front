import React from 'react';
import Spinner from '@/components/ui/spinner';

const CenteredAtomSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <Spinner  />
    </div>
  );
};

export default CenteredAtomSpinner;