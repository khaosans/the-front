'use client';

import React, { useState } from 'react';

interface SelectProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            setIsOpen,
            value,
            onValueChange
          });
        }
        return child;
      })}
    </div>
  );
};

export const SelectTrigger: React.FC<{ children: React.ReactNode; id?: string; isOpen?: boolean; setIsOpen?: (isOpen: boolean) => void }> = ({ children, id, isOpen, setIsOpen }) => {
  return (
    <button
      id={id}
      className="flex justify-between items-center w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => setIsOpen && setIsOpen(!isOpen)}
    >
      {children}
      <span className="ml-2">▼</span>
    </button>
  );
};

export const SelectValue: React.FC<{ children: React.ReactNode; placeholder?: string }> = ({ children, placeholder }) => {
  return <span>{children || placeholder}</span>;
};

export const SelectContent: React.FC<{ children: React.ReactNode; isOpen?: boolean }> = ({ children, isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
      {children}
    </div>
  );
};

export const SelectItem: React.FC<{ value: string; children: React.ReactNode; onValueChange?: (value: string) => void; setIsOpen?: (isOpen: boolean) => void }> = ({ value, children, onValueChange, setIsOpen }) => {
  return (
    <div
      className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
      onClick={() => {
        onValueChange && onValueChange(value);
        setIsOpen && setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
};