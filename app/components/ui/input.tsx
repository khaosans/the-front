'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ id, placeholder, ...props }) => {
    return (
        <input
            id={id}
            placeholder={placeholder}
            className="border rounded-md p-2 w-full"
            {...props}
        />
    );
};
