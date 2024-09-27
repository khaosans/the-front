'use client';

import { useState } from 'react';

type ModalContent = {
  [key: string]: { title: string; content: string };
};

const modalContent: ModalContent = {
  '/privacy': {
    title: 'Privacy Policy',
    content: 'This is our privacy policy...'
  },
  '/terms': {
    title: 'Terms of Service',
    content: 'These are our terms of service...'
  },
  '/contact': {
    title: 'Contact Us',
    content: 'Here\'s how to contact us...'
  }
};

const footerItems = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Footer() {
  const [openModal, setOpenModal] = useState<(typeof footerItems)[number]['href'] | null>(null);

  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              {footerItems.map((item) => (
                <li key={item.href}>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => setOpenModal(item.href)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{modalContent[openModal].title}</h2>
            <p className="mb-4">{modalContent[openModal].content}</p>
            <button 
              onClick={() => setOpenModal(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
