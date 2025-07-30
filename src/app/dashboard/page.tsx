import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data
const mockComplaints = [
  { id: '1', title: 'Giant pothole on Main St', status: 'In Progress', department: 'Public Works' },
  { id: '2', title: 'Broken Streetlight at 5th and Elm', status: 'Resolved', department: 'Energy Department' },
  { id: '3', title: 'Graffiti at Central Park entrance', status: 'Submitted', department: 'Parks & Recreation' },
  { id: '4', title: 'Abandoned vehicle on Oak Ave', status: 'Closed', department: 'Police Department' },
];

export default function DashboardPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Resolved': return 'default';
      case 'In Progress': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline text-accent">My Mission Control</h1>
        <p className="font-body text-lg text-muted-foreground mt-2">Your personal hub for tracking reported issues.</p>
      </div>
      <div className="grid gap-6">
        {mockComplaints.map((complaint) => (
          <Link key={complaint.id} href={`/complaints/${complaint.id}`} className="block group">
            <Card className="border-2 border-accent bg-secondary group-hover:border-primary transition-colors group-hover:bg-primary/10">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-body text-2xl group-hover:underline">{complaint.title}</CardTitle>
                  <Badge variant={getStatusVariant(complaint.status) as any} className="font-body text-sm">{complaint.status}</Badge>
                </div>
                <CardDescription className="font-body text-base !mt-2">Department: {complaint.department}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
