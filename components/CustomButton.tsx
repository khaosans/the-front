import React from 'react';
import { Button as GeistButton, ButtonProps } from '@geist-ui/react';

interface CustomButtonProps extends ButtonProps {
  placeholder?: string;
  children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, placeholder, ...props }) => {
  return <GeistButton {...props}>{children}</GeistButton>;
};

export { CustomButton };