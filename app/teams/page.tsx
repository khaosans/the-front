'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Users } from 'lucide-react';

const initialTeams = [
  { id: 1, name: 'Development Team', members: 8, avatar: 'DT' },
  { id: 2, name: 'Design Team', members: 5, avatar: 'DE' },
  { id: 3, name: 'Marketing Team', members: 6, avatar: 'MT' },
  { id: 4, name: 'Product Team', members: 4, avatar: 'PT' },
];

export default function TeamsPage() {
  const [teams, setTeams] = useState(initialTeams);
  const [newTeam, setNewTeam] = useState({ name: '', members: 0 });

  const addTeam = () => {
    if (newTeam.name) {
      setTeams([...teams, { ...newTeam, id: teams.length + 1, avatar: newTeam.name.substring(0, 2).toUpperCase() }]);
      setNewTeam({ name: '', members: 0 });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Teams</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>Add a new team to your organization.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="members" className="text-right">Members</Label>
                <Input
                  id="members"
                  type="number"
                  value={newTeam.members}
                  onChange={(e) => setNewTeam({ ...newTeam, members: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addTeam}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${team.avatar}`} />
                  <AvatarFallback>{team.avatar}</AvatarFallback>
                </Avatar>
                {team.name}
              </CardTitle>
              <CardDescription>{team.members} members</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/teams/${team.id}`} passHref>
                <Button className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  View Team
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}