'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Zap, Bot, Hash, Cloud, Server } from 'lucide-react';

// Mock data - replace with actual data fetching in a real application
const initialUsageData = [
  { name: 'Week 1', gpt3: 5000, gpt4: 3000, claude: 2000, localLLM: 8000, botHours: 20 },
  { name: 'Week 2', gpt3: 7000, gpt4: 4000, claude: 4000, localLLM: 10000, botHours: 25 },
  { name: 'Week 3', gpt3: 6000, gpt4: 3500, claude: 2500, localLLM: 9000, botHours: 22 },
  { name: 'Week 4', gpt3: 8000, gpt4: 5000, claude: 5000, localLLM: 12000, botHours: 30 },
];

const initialPricing = {
  gpt3Rate: 0.000002,   // $0.000002 per token
  gpt4Rate: 0.00003,    // $0.00003 per token
  claudeRate: 0.000011, // $0.000011 per token
  localLLMRate: 0,      // $0 per token (cost saved)
  botHourRate: 0.5,     // $0.50 per bot hour
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function CostAnalytics() {
  const [usageData, setUsageData] = useState(initialUsageData);
  const [pricing, setPricing] = useState(initialPricing);

  const calculateModelCost = (model: 'gpt3' | 'gpt4' | 'claude' | 'localLLM') => {
    return usageData.reduce((total, week) => total + week[model] * pricing[`${model}Rate`], 0);
  };

  const calculateTotalCost = () => {
    const modelCosts = ['gpt3', 'gpt4', 'claude', 'localLLM'].reduce((total, model) => total + calculateModelCost(model as keyof typeof initialPricing), 0);
    const botCost = usageData.reduce((total, week) => total + week.botHours * pricing.botHourRate, 0);
    return modelCosts + botCost;
  };

  const calculateCostSaved = () => {
    return usageData.reduce((total, week) => total + week.localLLM * pricing.gpt3Rate, 0);
  };

  const totalCost = calculateTotalCost();
  const costSaved = calculateCostSaved();

  const updatePricing = (key: keyof typeof pricing, value: string) => {
    setPricing(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const pieChartData = [
    { name: 'GPT-3', value: calculateModelCost('gpt3') },
    { name: 'GPT-4', value: calculateModelCost('gpt4') },
    { name: 'Claude', value: calculateModelCost('claude') },
    { name: 'Bot Hours', value: usageData.reduce((total, week) => total + week.botHours * pricing.botHourRate, 0) },
    { name: 'Cost Saved', value: costSaved },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Analytics & Cost Estimation</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Total Cost Card */}
        <Card className="bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">${totalCost.toFixed(2)}</div>
          </CardContent>
        </Card>

        {/* Cost Saved Card */}
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Saved (Local LLM)</CardTitle>
            <Server className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">${costSaved.toFixed(2)}</div>
          </CardContent>
        </Card>

        {/* Total Tokens Card */}
        <Card className="bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
            <Hash className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">
              {usageData.reduce((sum, week) => sum + week.gpt3 + week.gpt4 + week.claude + week.localLLM, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Total Bot Hours Card */}
        <Card className="bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bot Hours</CardTitle>
            <Bot className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {usageData.reduce((sum, week) => sum + week.botHours, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage Chart</TabsTrigger>
          <TabsTrigger value="cost">Cost Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Usage Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="gpt3" stackId="a" fill="#0088FE" name="GPT-3" />
                  <Bar dataKey="gpt4" stackId="a" fill="#00C49F" name="GPT-4" />
                  <Bar dataKey="claude" stackId="a" fill="#FFBB28" name="Claude" />
                  <Bar dataKey="localLLM" stackId="a" fill="#FF8042" name="Local LLM" />
                  <Bar dataKey="botHours" fill="#8884d8" name="Bot Hours" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cost">
          <Card>
            <CardHeader>
              <CardTitle>Cost Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cost Breakdown */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 mb-4">
            {/* Rate inputs */}
            {Object.entries(pricing).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={key}>{key.replace('Rate', '').toUpperCase()} Rate ($ per token/hour)</Label>
                <Input
                  id={key}
                  type="number"
                  value={value}
                  onChange={(e) => updatePricing(key as keyof typeof pricing, e.target.value)}
                  step="0.000001"
                  disabled={key === 'localLLMRate'}
                />
              </div>
            ))}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Week</TableHead>
                <TableHead>GPT-3</TableHead>
                <TableHead>GPT-4</TableHead>
                <TableHead>Claude</TableHead>
                <TableHead>Local LLM (Saved)</TableHead>
                <TableHead>Bot Hours</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usageData.map((week) => {
                const gpt3Cost = week.gpt3 * pricing.gpt3Rate;
                const gpt4Cost = week.gpt4 * pricing.gpt4Rate;
                const claudeCost = week.claude * pricing.claudeRate;
                const localLLMSaved = week.localLLM * pricing.gpt3Rate;
                const botCost = week.botHours * pricing.botHourRate;
                const total = gpt3Cost + gpt4Cost + claudeCost + botCost;
                return (
                  <TableRow key={week.name}>
                    <TableCell>{week.name}</TableCell>
                    <TableCell>${gpt3Cost.toFixed(2)}</TableCell>
                    <TableCell>${gpt4Cost.toFixed(2)}</TableCell>
                    <TableCell>${claudeCost.toFixed(2)}</TableCell>
                    <TableCell className="text-green-600">-${localLLMSaved.toFixed(2)}</TableCell>
                    <TableCell>${botCost.toFixed(2)}</TableCell>
                    <TableCell>${total.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}