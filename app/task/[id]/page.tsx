'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const [task] = useState({
    id: params.id,
    title: 'Implement login functionality',
    description: 'Add user authentication to the app including sign up, login, and password reset features.',
    status: 'inprogress',
    assignee: 'Bob Smith',
    dueDate: '2023-07-20',
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Alice Johnson',
      avatar: 'https://avatar.vercel.sh/alice.png',
      content: "I've started working on the backend for this. Let me know if you need any help with the frontend.",
      createdAt: '2023-07-10T10:00:00Z',
    },
    {
      id: '2',
      author: 'Charlie Brown',
      avatar: 'https://avatar.vercel.sh/charlie.png',
      content: "Make sure we're using secure password hashing for the user accounts.",
      createdAt: '2023-07-11T14:30:00Z',
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Current User',
        avatar: 'https://avatar.vercel.sh/user.png',
        content: newComment,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{task.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{task.description}</p>
          <div className="flex justify-between items-center">
            <div>
              <Badge variant={task.status === 'todo' ? 'default' : task.status === 'inprogress' ? 'secondary' : 'success'}>
                {task.status}
              </Badge>
              <span className="ml-4 text-sm text-muted-foreground">Due: {task.dueDate}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Assigned to:</span>
              <Avatar>
                <AvatarImage src={`https://avatar.vercel.sh/${task.assignee}.png`} alt={task.assignee} />
                <AvatarFallback>{task.assignee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">{comment.author}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddComment}>Post</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}