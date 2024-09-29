'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className={`hover:text-gray-300 ${isActive('/') ? 'font-bold' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/projects" className={`hover:text-gray-300 ${isActive('/projects') ? 'font-bold' : ''}`}>
            Projects
          </Link>
        </li>
        <li>
          <Link href="/projects/new" className={`hover:text-gray-300 ${isActive('/projects/new') ? 'font-bold' : ''}`}>
            New Project
          </Link>
        </li>
        <li>
          <Link href="/taskboard" className={`hover:text-gray-300 ${isActive('/taskboard') ? 'font-bold' : ''}`}>
            Taskboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}