'use client';

import React, { useState, useEffect } from 'react';
import CenteredAtomSpinner from "@/components/CenteredAtomSpinner"; // Import the spinner

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CenteredAtomSpinner />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      {/* Profile content goes here */}
    </div>
  );
};

export default Profile;