'use client';

import { useState } from 'react';
import { suggestAdminActions } from '@/ai/flows/suggest-admin-actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2 } from 'lucide-react';
import type { Complaint } from '@/lib/types';

const mockComplaints: (Omit<Complaint, 'timeline' | 'submittedBy' | 'createdAt' | 'updatedAt' | 'fileUrl'>)[] = [
  { id: '1', title: 'Giant pothole on Main St', description: 'A very large and dangerous pothole has formed on Main St, near the intersection with 1st Ave. It has already damaged several car tires.', location: 'Main St & 1st Ave', status: 'In Progress', department: 'Public Works' },
  { id: '2', title: 'Broken Streetlight at 5th and Elm', description: 'The streetlight on the corner of 5th and Elm has been out for over a week, making the area very dark at night.', location: '5th and Elm', status: 'Resolved', department: 'Energy Department' },
  { id: '3', title: 'Graffiti at Central Park entrance', description: 'The main entrance arch at Central Park has been vandalized with spray paint.', location: 'Central Park', status: 'Submitted', department: 'Parks & Recreation' },
];

export default function AdminPage() {
  const { toast } = useToast();
  const [isLoadingAi, setIsLoadingAi] = useState<string | null>(null);
  const [aiActions, setAiActions] = useState<Record<string, { suggestedActions: string[], reasoning: string }>>({});

  const handleSuggestActions = async (complaint: (typeof mockComplaints)[0]) => {
    setIsLoadingAi(complaint.id);
    try {
      const result = await suggestAdminActions({
        issueDescription: complaint.description,
        department: complaint.department,
        location: complaint.location,
      });
      setAiActions(prev => ({ ...prev, [complaint.id]: result }));
    } catch (error) {
      console.error(error);
      toast({ title: 'AI Suggestion Failed', description: 'Could not generate admin actions.', variant: 'destructive' });
    } finally {
      setIsLoadingAi(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline text-accent">Admin Command Center</h1>
        <p className="font-body text-lg text-muted-foreground mt-2">Oversee and manage all community-reported issues.</p>
      </div>

      <Card className="border-4 border-accent bg-secondary">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-accent">Incoming Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-accent font-headline text-lg">
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-body text-base">
              {mockComplaints.map((c) => (
                <TableRow key={c.id} className="border-accent">
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.department}</TableCell>
                  <TableCell><Badge variant="outline">{c.status}</Badge></TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleSuggestActions(c)} disabled={!!isLoadingAi}>
                      {isLoadingAi === c.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                      <span className="ml-2">AI Actions</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {Object.entries(aiActions).map(([id, actions]) => {
          const complaint = mockComplaints.find(c => c.id === id);
          if (!complaint) return null;
          
          return (
            <Card key={id} className="mt-4 border-2 border-primary bg-black p-4">
              <CardTitle className="font-body text-lg text-primary">AI Suggested Actions for "{complaint.title}"</CardTitle>
              <CardContent className="pt-4 text-sm">
                  <p className="text-muted-foreground font-bold">Reasoning: <span className="font-normal">{actions.reasoning}</span></p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                      {actions.suggestedActions.map((action, i) => <li key={i}>{action}</li>)}
                  </ul>
              </CardContent>
          </Card>
          )
      })}
    </div>
  );
}
