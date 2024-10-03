'use client';

import React from 'react';
import Dropdown from '../components/Dropdown';

const options = [
  { label: 'Option 1', onClick: () => console.log('Selected Option 1') },
  { label: 'Option 2', onClick: () => console.log('Selected Option 2') },
  { label: 'Option 3', onClick: () => console.log('Selected Option 3') },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Dropdown label="Select an Option" items={options} />
    </div>
  );
};

export default HomePage;
