import React from 'react';
import { useTheme } from '../app/contexts/ThemeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { isDark, getThemeClasses } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className={`rounded-lg p-8 max-w-md w-full mx-4 ${getThemeClasses()}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className={`text-2xl ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}>&times;</button>
        </div>
        <div className="mt-4">
          {children}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded text-white ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;