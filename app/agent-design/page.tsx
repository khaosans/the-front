'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Bot, Send, Zap, Settings, Calendar, Clock, BarChart } from 'lucide-react';
import Slider from '@geist-ui/react/esm/slider/slider';

const AgentDesignPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'agent', content: 'Hello! I\'m your AI task assistant. How can I help you today?' },
    { role: 'user', content: 'Can you help me prioritize my tasks for today?' },
    { role: 'agent', content: 'I\'ll analyze your current tasks and deadlines to suggest a prioritized list. Give me a moment...' },
    { role: 'agent', content: 'Based on your deadlines and task importance, here\'s a suggested priority list for today:\n\n1. Complete project proposal (due tomorrow)\n2. Review and respond to client emails\n3. Prepare for team meeting at 2 PM\n4. Start research for upcoming presentation\n5. Update task board with current progress\n\nWould you like me to create these tasks in your task list?' },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { role: 'user', content: inputMessage }]);
      setInputMessage('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'agent', content: 'I understand. I\'ll work on that right away and update your task list accordingly.' }]);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">AI Agent Design</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Task Assistant</CardTitle>
            <CardDescription>Interact with your AI agent to manage tasks efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] mb-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      {message.role === 'agent' ? (
                        <Bot className="w-6 h-6 text-primary" />
                      ) : (
                        <AvatarImage src="https://github.com/shadcn.png" />
                      )}
                      <AvatarFallback>{message.role === 'agent' ? 'AI' : 'You'}</AvatarFallback>
                    </Avatar>
                    <div className={`mx-2 p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {message.content}
                    </div>
                  </div>
                </motion.div>
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
              <CardTitle>Agent Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    Scheduling
                  </Badge>
                  <span className="text-sm">Manage your calendar and deadlines</span>
                </li>
                <li className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    <BarChart className="w-4 h-4 mr-1" />
                    Analytics
                  </Badge>
                  <span className="text-sm">Provide insights on productivity</span>
                </li>
                <li className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    <Zap className="w-4 h-4 mr-1" />
                    Automation
                  </Badge>
                  <span className="text-sm">Automate repetitive tasks</span>
                </li>
                <li className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    <Clock className="w-4 h-4 mr-1" />
                    Reminders
                  </Badge>
                  <span className="text-sm">Send timely notifications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agent Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="proactivity">Proactivity Level</Label>
                  <Slider
                    id="proactivity"
                    max={100}
                    defaultValue={50}
                    step={10}
                    className="w-[60%]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Push Notifications</Label>
                  <Switch id="notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="learning">Continuous Learning</Label>
                  <Switch id="learning" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDesignPage;