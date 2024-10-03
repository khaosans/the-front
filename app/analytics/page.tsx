'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const initialTaskCompletionData = [
	{ date: '2023-01', completed: 45, total: 60 },
	{ date: '2023-02', completed: 52, total: 65 },
	{ date: '2023-03', completed: 48, total: 70 },
	{ date: '2023-04', completed: 70, total: 80 },
	{ date: '2023-05', completed: 65, total: 75 },
	{ date: '2023-06', completed: 80, total: 90 },
];

const initialTeamPerformanceData = [
	{ name: 'Development', performance: 85 },
	{ name: 'Design', performance: 78 },
	{ name: 'Marketing', performance: 92 },
	{ name: 'Product', performance: 88 },
];

const initialTaskDistributionData = [
	{ name: 'To Do', value: 30, color: '#FF6384' },
	{ name: 'In Progress', value: 45, color: '#36A2EB' },
	{ name: 'Done', value: 25, color: '#FFCE56' },
];

export default function AnalyticsPage() {
	const [taskCompletionData, setTaskCompletionData] = useState(initialTaskCompletionData);
	const [teamPerformanceData, setTeamPerformanceData] = useState(initialTeamPerformanceData);
	const [taskDistributionData, setTaskDistributionData] = useState(initialTaskDistributionData);

	useEffect(() => {
		const interval = setInterval(() => {
			setTaskCompletionData((prevData) =>
				prevData.map((entry) => ({
					...entry,
					completed: Math.max(0, Math.min(entry.total, entry.completed + Math.floor(Math.random() * 10 - 5))),
				}))
			);

			setTeamPerformanceData((prevData) =>
				prevData.map((entry) => ({
					...entry,
					performance: Math.max(0, Math.min(100, entry.performance + Math.floor(Math.random() * 10 - 5))),
				}))
			);

			setTaskDistributionData((prevData) => {
				const total = prevData.reduce((sum, entry) => sum + entry.value, 0);
				return prevData.map((entry) => ({
					...entry,
					value: Math.max(0, Math.min(total, entry.value + Math.floor(Math.random() * 10 - 5))),
				}));
			});
		}, Math.floor(Math.random() * 6000) + 4000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Task Completion Over Time</CardTitle>
						<CardDescription>Completed tasks vs total tasks</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={taskCompletionData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="date" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" name="Total Tasks" />
									<Area type="monotone" dataKey="completed" stroke="#82ca9d" fill="#82ca9d" name="Completed Tasks" />
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Team Performance</CardTitle>
						<CardDescription>Performance score by team</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={teamPerformanceData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar dataKey="performance" fill="#8884d8" name="Performance Score" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Task Distribution</CardTitle>
						<CardDescription>Current status of all tasks</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={taskDistributionData}
										cx="50%"
										cy="50%"
										labelLine={false}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
										label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
									>
										{taskDistributionData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip />
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}