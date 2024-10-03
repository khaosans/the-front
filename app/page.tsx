'use client';

import { useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import React from 'react';
import Dropdown from '../components/Dropdown';

const options = [
    { label: 'Option 1', onClick: () => console.log('Option 1 selected') },
    { label: 'Option 2', onClick: () => console.log('Option 2 selected') },
];

const Page = () => {
    const handleSelect = (option: string) => {
        console.log(option);
    };

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <Dropdown label="Select an Option" items={options} />
        </div>
    );
};

export default Page;
