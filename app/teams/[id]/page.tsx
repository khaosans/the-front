'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Mail } from 'lucide-react'

const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Developer', email: 'john@example.com', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@example.com', avatar: 'JS' },
    { id: 3, name: 'Bob Johnson', role: 'Product Manager', email: 'bob@example.com', avatar: 'BJ' },
]

export default function TeamPage() {
    const params = useParams()
    const [members, setMembers] = useState(teamMembers)
    const [newMember, setNewMember] = useState({ name: '', role: '', email: '' })

    const addMember = () => {
        if (newMember.name && newMember.role && newMember.email) {
            setMembers([...members, { ...newMember, id: members.length + 1, avatar: newMember.name.substring(0, 2).toUpperCase() }])
            setNewMember({ name: '', role: '', email: '' })
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">Team Details</h1>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage your team members and their roles</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <Avatar className="mr-2">
                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.avatar}`} />
                                                <AvatarFallback>{member.avatar}</AvatarFallback>
                                            </Avatar>
                                            {member.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">
                                            <Mail className="h-4 w-4 mr-2" />
                                            Contact
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Team Member
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Team Member</DialogTitle>
                        <DialogDescription>Add a new member to your team.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                value={newMember.name}
                                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">Role</Label>
                            <Input
                                id="role"
                                value={newMember.role}
                                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={newMember.email}
                                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={addMember}>Add Member</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
