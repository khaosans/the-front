'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthenticatedLayout from '../components/AuthenticatedLayout';

const MembersPage = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching members:', error);
    } else {
      setMembers(data || []);
    }
  };

  const inviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;

    // Here you would typically send an invitation email
    // For now, we'll just add the email to the members list
    const { data, error } = await supabase
      .from('users')
      .insert({ email: newMemberEmail })
      .select()
      .single();

    if (error) {
      console.error('Error inviting member:', error);
    } else {
      setMembers([...members, data]);
      setNewMemberEmail('');
    }
  };

  const removeMember = async (memberId: string) => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', memberId);

    if (error) {
      console.error('Error removing member:', error);
    } else {
      setMembers(members.filter(member => member.id !== memberId));
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-4">Team Members</h1>
        <form onSubmit={inviteMember} className="mb-4">
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="New member email"
            className="mr-2 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Invite Member
          </button>
        </form>
        <ul>
          {members.map((member) => (
            <li key={member.id} className="mb-2 flex justify-between items-center">
              <span>{member.email} {member.full_name ? `(${member.full_name})` : ''}</span>
              <button 
                onClick={() => removeMember(member.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </AuthenticatedLayout>
  );
};

export default MembersPage;