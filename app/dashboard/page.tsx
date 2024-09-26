'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card"; // Ensure this import is correct
import { PlusCircle, ListTodo, Settings } from 'lucide-react';
import {Header} from "@/components/Header"; // Ensure this import is correct

export default function DashboardPage() {
    const router = useRouter();

    return (
        <div>
            <Header /> {/* Include the Header component */}
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                        <Card.Header>
                            <Card.Title>My Tasks</Card.Title>
                            <Card.Description>View and manage your current tasks</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <ListTodo className="w-12 h-12 mb-4" />
                            <p>You have 5 tasks in progress</p>
                        </Card.Content>
                        <Card.Footer>
                            <Button onClick={() => router.push('/board')}>View Board</Button>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title>New Project</Card.Title>
                            <Card.Description>Start a new project board</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <PlusCircle className="w-12 h-12 mb-4" />
                            <p>Create a new project to organize your tasks</p>
                        </Card.Content>
                        <Card.Footer>
                            <Button>Create Project</Button>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title>Settings</Card.Title>
                            <Card.Description>Manage your account settings</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Settings className="w-12 h-12 mb-4" />
                            <p>Update your profile and preferences</p>
                        </Card.Content>
                        <Card.Footer>
                            <Button variant="outline">Open Settings</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </div>
    );
}
