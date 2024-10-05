'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsDashboard() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome to the Analytics Dashboard. Detailed analytics will be displayed here.</p>
      </CardContent>
    </Card>
  );
}