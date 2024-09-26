'use client';

import React from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { CardDescription } from "./ui/card-description";
import {Label} from "@/components/forms/label"; // Import CardDescription

function Textarea(props: { defaultValue: string, id: string }) {
    return null;
}

export default function Profile() {
    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Profile</h1>
                <Button>Save Changes</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <Card.Header>
                        <Card.Title>Personal Information</Card.Title>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </Card.Header>
                    <Card.Content>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/avatars/user.png" alt="User" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <Button variant="outline">Change Avatar</Button>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" defaultValue="Project manager with 5 years of experience in software development." />
                        </div>
                    </Card.Content>
                </Card>

                {/* Additional cards for account settings, notifications, etc. */}
            </div>
        </div>
    );
}
