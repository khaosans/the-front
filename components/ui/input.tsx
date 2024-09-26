'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', ...props }) => {
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="input-label">{label}</label>}
            <input id={id} className={`input ${className}`} {...props} />
        </div>
    );
};
