import React, { useState } from 'react';
import { useTheme } from '../app/contexts/ThemeContext';
import Modal from './Modal';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className={`w-full py-3 ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-sm">
          <p>&copy; 2024 QuantumLabs</p>
          <div>
            <button onClick={() => setShowAbout(true)} className="mx-2 hover:underline text-blue-600 dark:text-blue-400">About</button>
            <button onClick={() => setShowContact(true)} className="mx-2 hover:underline text-blue-600 dark:text-blue-400">Contact</button>
            <button onClick={() => setShowPrivacy(true)} className="mx-2 hover:underline text-blue-600 dark:text-blue-400">Privacy</button>
          </div>
        </div>
      </div>

      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)} title="About Us">
        <p>QuantumLabs is a cutting-edge technology company specializing in task management solutions.</p>
      </Modal>

      <Modal isOpen={showContact} onClose={() => setShowContact(false)} title="Contact Us">
        <p>Email: contact@quantumlabs.com</p>
        <p>Phone: +1 (555) 123-4567</p>
      </Modal>

      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
        <p>At QuantumLabs, we take your privacy seriously. We collect only essential data to provide our services and improve your experience.</p>
      </Modal>
    </footer>
  );
};

export default Footer;
