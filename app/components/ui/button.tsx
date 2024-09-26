'use client';

import React from 'react';
import styles from './button.module.css'; // Import CSS module

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
};
