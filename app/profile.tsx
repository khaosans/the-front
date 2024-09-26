'use client';

import React from 'react';
import { Button } from "@/app/components/ui/button"; // Corrected import path
import { Input } from "@/app/components/ui/input"; // Corrected import path
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"; // Corrected import path
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"; // Corrected import path
import CardDescription from "@/app/components/ui/card-description"; // Ensure correct import
import CardFooter from "@/app/components/ui/card-footer"; // Ensure correct import
import { Label } from "@/app/components/forms/label";
import Link from "next/link"; // Corrected import path

function Textarea(props: { defaultValue: string; id: string }) {
    return <textarea id={props.id} defaultValue={props.defaultValue} className="textarea-class" />; // Added textarea implementation
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
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                {/* Additional cards for account settings, notifications, etc. */}
            </div>
        </div>
    );
}
