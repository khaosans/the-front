import React, { useState } from 'react';
import { useTheme } from '../app/contexts/ThemeContext';
import Modal from './Modal'; // Assuming Modal.tsx is in the same directory

const Footer: React.FC = () => {
  const { isDark, getThemeClasses } = useTheme();
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className={`w-full py-3 ${getThemeClasses()}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-sm">
          <p>&copy; 2023 QuantumLabs</p>
          <div>
            <button onClick={() => setShowAbout(true)} className={`mx-2 hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>About</button>
            <button onClick={() => setShowContact(true)} className={`mx-2 hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Contact</button>
            <button onClick={() => setShowPrivacy(true)} className={`mx-2 hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Privacy</button>
          </div>
        </div>
      </div>

      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)} title="About Us">
        <p>QuantumLabs is a cutting-edge technology company specializing in task management solutions. Our mission is to empower individuals and teams to achieve their full potential through innovative productivity tools.</p>
      </Modal>

      <Modal isOpen={showContact} onClose={() => setShowContact(false)} title="Contact Us">
        <p>We're here to help! Reach out to us through any of the following channels:</p>
        <p className="mt-2">Email: contact@quantumlabs.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Tech Street, Innovation City, QU 12345</p>
      </Modal>

      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
        <p>At QuantumLabs, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.</p>
        <p className="mt-2">We collect only essential data to provide our services and improve your experience. Your data is never sold or shared with third parties without your explicit consent.</p>
        <p className="mt-2">For more details, please visit our full privacy policy page.</p>
      </Modal>
    </footer>
  );
};

export default Footer;
