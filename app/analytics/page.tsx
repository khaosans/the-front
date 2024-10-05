'use client';

import CostAnalytics from './cost-analytics'
import AnalyticsDashboard from './analytics-dashboard'

export default function AnalyticsPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
			<AnalyticsDashboard />
			<CostAnalytics />
		</div>
	)
}