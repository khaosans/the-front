'use client'; // Ensure this is a Client Component

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ListTodo, Settings } from 'lucide-react';

export default function DashboardPage() {
	const router = useRouter();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>My Tasks</CardTitle>
						<CardDescription>View and manage your current tasks</CardDescription>
					</CardHeader>
					<CardContent>
						<ListTodo className="w-12 h-12 mb-4" />
						<p>You have 5 tasks in progress</p>
					</CardContent>
					<CardFooter>
						<Button onClick={() => router.push('/board')}>View Board</Button>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>New Project</CardTitle>
						<CardDescription>Start a new project board</CardDescription>
					</CardHeader>
					<CardContent>
						<PlusCircle className="w-12 h-12 mb-4" />
						<p>Create a new project to organize your tasks</p>
					</CardContent>
					<CardFooter>
						<Button>Create Project</Button>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Settings</CardTitle>
						<CardDescription>Manage your account settings</CardDescription>
					</CardHeader>
					<CardContent>
						<Settings className="w-12 h-12 mb-4" />
						<p>Update your profile and preferences</p>
					</CardContent>
					<CardFooter>
						<Button>Open Settings</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
