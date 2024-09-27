'use client';

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '../../contexts/ThemeContext'

interface Member {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
}

interface Board {
  id: string
  name: string
  tasks: { total: number; completed: number }
}

interface Team {
  id: string
  name: string
  members: Member[]
  boards: Board[]
}

// This would typically come from an API or database
const fetchTeamData = async (teamId: string): Promise<Team> => {
  // Simulating API call
  return {
    id: teamId,
    name: `Team ${teamId}`,
    members: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
    ],
    boards: [
      { id: '1', name: 'Project Alpha', tasks: { total: 20, completed: 8 } },
      { id: '2', name: 'Website Redesign', tasks: { total: 15, completed: 3 } },
    ]
  };
};

export default function TeamPage({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState<Team | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { isDark, getThemeClasses } = useTheme()

  useEffect(() => {
    fetchTeamData(params.id).then(setTeam);
  }, [params.id]);

  if (!team) return <div>Loading...</div>;

  const filteredMembers = team.members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredBoards = team.boards.filter(board => 
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`container mx-auto py-10 ${getThemeClasses()}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Team: {team.name}</h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search members or boards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        </div>
      </div>
      <div className="space-y-8">
        <Card className={isDark ? 'bg-gray-800' : ''}>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge variant={member.role === 'Admin' ? 'default' : member.role === 'Editor' ? 'secondary' : 'outline'}>
                        {member.role}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div>
          <h2 className="text-2xl font-bold mb-4">Team Boards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoards.map((board) => (
              <Link href={`/board/${board.id}`} key={board.id}>
                <Card className={`hover:shadow-lg transition-shadow ${isDark ? 'bg-gray-800' : ''}`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">{board.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <p>Tasks: {board.tasks.completed} / {board.tasks.total}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{width: `${(board.tasks.completed / board.tasks.total) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${isDark ? 'bg-gray-800' : ''}`}>
              <CardContent className="flex items-center justify-center h-full">
                <Button variant="ghost">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Board
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}