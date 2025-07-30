'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const issuesByDeptData = [
  { department: 'Public Works', issues: 40 },
  { department: 'Parks & Rec', issues: 30 },
  { department: 'Police Dept', issues: 20 },
  { department: 'Energy Dept', issues: 27 },
  { department: 'Transportation', issues: 18 },
];

const complaintStatusData = [
  { name: 'Submitted', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Resolved', value: 100 },
  { name: 'Closed', value: 200 },
];
const COLORS = ['#FF4136', '#FFDC00', '#2ECC40', '#0074D9'];

export default function StatsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline text-accent">Community Leaderboard</h1>
        <p className="font-body text-lg text-muted-foreground mt-2">High scores and stats from across the city.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-4 border-accent bg-secondary">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-accent text-center">Issues by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full font-body">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issuesByDeptData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="department" tick={{ fill: 'hsl(var(--foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--foreground))' }}/>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="issues" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-4 border-accent bg-secondary">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-accent text-center">Complaint Statuses</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full font-body">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                  <Pie data={complaintStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false} label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {complaintStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
