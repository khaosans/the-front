'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Home, ClipboardList, BarChart2, Users, Bell, Settings } from 'lucide-react';

const pages = [
    { title: 'Home', description: 'Go to the home page', icon: Home, href: '/' },
    { title: 'Dashboard', description: 'View your dashboard', icon: ClipboardList, href: '/dashboard' },
    { title: 'Notifications', description: 'View notifications', icon: Bell, href: '/notifications' },
    { title: 'Settings', description: 'Manage your settings', icon: Settings, href: '/settings' },
];

const ConsolePage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Console</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle>{page.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <page.icon className="w-12 h-12 mb-4" />
                            <p>{page.description}</p>
                        </CardContent>
                        <Link href={page.href}>
                            <Button className="mt-4">Go to {page.title}</Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ConsolePage;