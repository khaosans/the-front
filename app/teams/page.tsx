'use client'; // Ensure this is a Client Component

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, Search, UserMinus } from 'lucide-react';
import { mockClient } from '@/lib/mockClient';
import Spinner from '@/app/components/Spinner'

interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: TeamMember[];
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const fetchedTeams = await mockClient.fetchTeams();
        setTeams(fetchedTeams);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        toast({
          title: "Error",
          description: "Failed to load teams. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const handleCreateTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTeam: Team = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      createdAt: new Date().toISOString().split('T')[0],
      members: []
    };
    setTeams([...teams, newTeam]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Success",
      description: "Team created successfully.",
    });
  };

  const handleEditTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentTeam) return;
    const formData = new FormData(event.currentTarget);
    const updatedTeam: Team = {
      ...currentTeam,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    };
    setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
    setIsEditDialogOpen(false);
    setCurrentTeam(null);
    toast({
      title: "Success",
      description: "Team updated successfully.",
    });
  };

  const handleAddMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentTeam) return;
    const formData = new FormData(event.currentTarget);
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      avatar: `https://avatar.vercel.sh/${formData.get('name')}.png`,
    };
    const updatedTeam = {
      ...currentTeam,
      members: [...currentTeam.members, newMember]
    };
    setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
    setIsAddMemberDialogOpen(false);
    setCurrentTeam(null);
    toast({
      title: "Success",
      description: "Team member added successfully.",
    });
  };

  const handleRemoveMember = (teamId: string, memberId: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter(member => member.id !== memberId)
        };
      }
      return team;
    });
    setTeams(updatedTeams);
    toast({
      title: "Success",
      description: "Team member removed successfully.",
    });
  };

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner />

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teams</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Team
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="pl-8" 
            placeholder="Search teams..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="mb-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
            setCurrentTeam(team);
            setIsEditDialogOpen(true);
          }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                {team.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{team.description}</p>
              <Tabs defaultValue="members" className="w-full">
                <TabsList>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="members">
                  <ScrollArea className="h-[200px]">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="projects">
                  <p className="text-sm text-muted-foreground">No projects assigned to this team.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTeam}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" name="description" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Team</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditTeam}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input id="edit-name" name="name" className="col-span-3" defaultValue={currentTeam?.name} required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">Description</Label>
                <Textarea id="edit-description" name="description" className="col-span-3" defaultValue={currentTeam?.description} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Team</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
};

export default TeamsPage;
