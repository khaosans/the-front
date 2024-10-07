'use client';

import React, { useState } from 'react';
import RobotTransformerWallpaper from '../../components/RobotTransformerWallpaper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, Send } from 'lucide-react';

const TaskDesignPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'designer', content: 'Welcome to the Task Design interface. How can I assist you in designing your tasks today?' },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { role: 'user', content: inputMessage }]);
      setInputMessage('');
      // Simulate designer response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'designer', content: 'I have added your task to the design board. Would you like to add more details or tasks?' }]);
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <RobotTransformerWallpaper />
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Task Design</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Task Design Interface</CardTitle>
              <CardDescription>Interact with the task designer to create and manage tasks efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="w-8 h-8">
                        {message.role === 'designer' ? (
                          <Bot className="w-6 h-6 text-primary" />
                        ) : (
                          <AvatarImage src="https://github.com/shadcn.png" />
                        )}
                        <AvatarFallback>{message.role === 'designer' ? 'TD' : 'You'}</AvatarFallback>
                      </Avatar>
                      <div className={`mx-2 p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message here..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Design Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      Task Creation
                    </Badge>
                    <span className="text-sm">Design and create new tasks</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      Task Management
                    </Badge>
                    <span className="text-sm">Organize and prioritize tasks</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      Collaboration
                    </Badge>
                    <span className="text-sm">Collaborate with team members</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDesignPage;