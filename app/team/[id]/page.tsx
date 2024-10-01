'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle, UserMinus } from 'lucide-react';
import {Label} from "@/components/forms/label";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: Member[];
}

// Simulated API call to fetch team data
const fetchTeamData = async (teamId: string): Promise<Team> => {
  // Simulating API call
  return {
    id: teamId,
    name: `Team ${teamId}`,
    description: `Description for Team ${teamId}`,
    createdAt: '2023-06-01',
    members: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: 'https://avatar.vercel.sh/john.png' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', avatar: 'https://avatar.vercel.sh/jane.png' },
    ],
  };
};

export default function TeamPage({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);

  useEffect(() => {
    fetchTeamData(params.id).then(setTeam);
  }, [params.id]);

  if (!team) return <div>Loading...</div>;

  const filteredMembers = team.members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMember: Member = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      avatar: `https://avatar.vercel.sh/${formData.get('name')}.png`,
    };
    setTeam(prev => prev ? { ...prev, members: [...prev.members, newMember] } : prev);
    setIsAddMemberDialogOpen(false);

  };

  const handleRemoveMember = (memberId: string) => {
    if (team) {
      const updatedMembers = team.members.filter(member => member.id !== memberId);
      setTeam({ ...team, members: updatedMembers });

    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Team: {team.name}</h1>
      <div className="flex items-center mb-4">
        <Input
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <Button onClick={() => setIsAddMemberDialogOpen(true)} className="ml-2">
          <PlusCircle className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <ul>
              {filteredMembers.map((member) => (
                <li key={member.id} className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{member.name}</span> - {member.role}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(member.id)}>
                    <UserMinus className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddMember}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="member-name" className="text-right">Name</Label>
                <Input id="member-name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="member-email" className="text-right">Email</Label>
                <Input id="member-email" name="email" type="email" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="member-role" className="text-right">Role</Label>
                <Input id="member-role" name="role" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
