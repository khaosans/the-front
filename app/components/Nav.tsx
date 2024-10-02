import { Link } from 'lucide-react';
import React from 'react';

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/tasks">Taskboard</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/teams">Teams</Link>
        </li>
        <li>
          <Link href="/other-page">Other Page</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;