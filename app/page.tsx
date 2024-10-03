'use client';

import { useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import React from 'react';
import Dropdown from '../components/Dropdown';

const options = ['Option 1', 'Option 2', 'Option 3'];

const HomePage: React.FC = () => {
  const handleSelect = (option: string) => {
    console.log('Selected option:', option);
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Dropdown options={options} onSelect={handleSelect} />
    </div>
  );
};

export default HomePage;
