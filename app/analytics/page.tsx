'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const generateRandomData = (length: number) => {
	return Array.from({ length }, (_, index) => ({
		name: `Point ${index + 1}`,
		value: Math.floor(Math.random() * 100),
	}));
};

const AnalyticsPage: React.FC = () => {
	const [lineData, setLineData] = useState(generateRandomData(10));
	const [barData, setBarData] = useState(generateRandomData(5));
	const [pieData, setPieData] = useState(generateRandomData(3));

	useEffect(() => {
		const interval = setInterval(() => {
			setLineData(generateRandomData(10));
			setBarData(generateRandomData(5));
			setPieData(generateRandomData(3));
		}, Math.random() * 5000 + 5000); // Refresh every 5-10 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={lineData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="value" stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>

				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={barData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="value" fill="#82ca9d" />
					</BarChart>
				</ResponsiveContainer>

				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
							{pieData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default AnalyticsPage;