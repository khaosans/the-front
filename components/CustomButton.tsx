import React from 'react';
import { Button as GeistButton, ButtonProps } from '@geist-ui/react';

interface CustomButtonProps extends Omit<ButtonProps, 'placeholder'> {
  placeholder?: string;
  scale?: number | string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, placeholder = '', scale, ...props }) => {
  return <GeistButton placeholder={placeholder} scale={scale} {...props}>{children}</GeistButton>;
};

export { CustomButton };