import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TimelineEvent } from '@/lib/types';

const mockComplaint = {
  id: '1',
  title: 'Giant pothole on Main St',
  description: 'A very large and dangerous pothole has formed on Main St, near the intersection with 1st Ave. It has already damaged several car tires. It is approximately 3 feet wide and 6 inches deep.',
  location: 'Main St & 1st Ave',
  status: 'In Progress',
  department: 'Public Works',
  submittedBy: 'User123',
  createdAt: new Date('2024-05-20T10:00:00Z').toLocaleString(),
  updatedAt: new Date('2024-05-22T14:30:00Z').toLocaleString(),
  timeline: [
    { id: 't1', date: new Date('2024-05-20T10:00:00Z').toLocaleString(), status: 'Submitted', comment: 'Issue reported by citizen.' },
    { id: 't2', date: new Date('2024-05-21T09:00:00Z').toLocaleString(), status: 'Acknowledged', comment: 'Issue acknowledged by Public Works department. Ticket #PW-12345 created.' },
    { id: 't3', date: new Date('2024-05-22T14:30:00Z').toLocaleString(), status: 'In Progress', comment: 'A maintenance crew has been dispatched to assess the situation.' },
  ],
  fileUrl: 'https://placehold.co/600x400.png',
};

// A simple timeline component for demonstration
function ComplaintTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-accent"></div>
      
      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={event.id} className="relative">
            <div className="absolute -left-[32px] top-0.5 h-4 w-4 rounded-full bg-primary border-4 border-secondary"></div>
            <p className="font-body text-lg text-accent">{event.status}</p>
            <p className="font-body text-sm text-muted-foreground">{event.date}</p>
            <p className="font-body text-base mt-1">{event.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ComplaintDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch complaint data based on params.id
  const complaint = mockComplaint;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Card className="border-4 border-accent bg-secondary">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-3xl text-accent">{complaint.title}</CardTitle>
            <Badge variant="default" className="font-body text-lg">{complaint.status}</Badge>
          </div>
          <CardDescription className="font-body text-lg pt-2">
            Issue #{complaint.id} in {complaint.department}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 font-body text-lg">
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="font-headline text-xl text-accent">Description</h3>
              <p>{complaint.description}</p>
            </div>
            <div>
              <h3 className="font-headline text-xl text-accent">Location</h3>
              <p>{complaint.location}</p>
            </div>
          </div>
          <div className="space-y-4">
             {complaint.fileUrl && (
                <div>
                  <h3 className="font-headline text-xl text-accent mb-2">Attached File</h3>
                  <img src={complaint.fileUrl} alt="Attached file for complaint" data-ai-hint="pothole street" className="w-full border-2 border-accent" />
                </div>
              )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-4 border-accent bg-secondary">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-accent">Mission Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ComplaintTimeline events={complaint.timeline} />
        </CardContent>
      </Card>
    </div>
  );
}
