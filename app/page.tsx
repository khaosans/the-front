'use client';

import React from 'react';
import Dropdown from '../components/Dropdown'; // Adjust the import path as necessary

const options = [
    { label: 'Option 1', onClick: () => console.log('Option 1 selected') },
    { label: 'Option 2', onClick: () => console.log('Option 2 selected') },
];

const Page = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <Dropdown label="Select an Option" items={options} />
        </div>
    );
};

export default Page;