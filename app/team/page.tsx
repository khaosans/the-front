'use client';

import React, { useState, useEffect } from 'react';
import { mockClient, Member } from '@/lib/mockClient';

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const fetchedMembers = await mockClient.fetchMembers();
      setMembers(fetchedMembers);
    }
    fetchMembers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Team</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id} className="mb-2">
            <span className="font-semibold">{member.name}</span> - {member.role}
          </li>
        ))}
      </ul>
    </div>
  );
}