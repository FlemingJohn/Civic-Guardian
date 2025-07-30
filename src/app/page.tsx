import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const pixelButtonClasses = "font-body text-xl border-2 border-foreground shadow-[4px_4px_0px_hsl(var(--foreground))] hover:shadow-none active:shadow-none active:translate-x-1 active:translate-y-1 transition-all";

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12">
      <div className="space-y-4">
        <h1 className="text-6xl font-headline text-accent animate-pulse">
          Civic Guardians
        </h1>
        <p className="text-2xl font-body max-w-2xl mx-auto">
          Your shield for community action and issue tracking. Report problems and help us protect our community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="border-4 border-accent bg-secondary text-center">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-accent">Report an Issue</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="font-body text-lg">Found a pothole? A broken streetlight? Report it here and get it on the map.</p>
            <Button asChild className={pixelButtonClasses}>
              <Link href="/report-issue">
                Start Mission
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-4 border-accent bg-secondary text-center">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-accent">View Public Stats</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="font-body text-lg">See the high scores! Check out community-wide stats on reported issues.</p>
            <Button asChild className={pixelButtonClasses}>
              <Link href="/stats">
                Leaderboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="pt-8">
         <p className="font-body text-lg">Already on a mission?</p>
         <div className="flex gap-4 mt-2">
           <Button asChild variant="link" className="font-body text-accent text-xl hover:underline">
             <Link href="/dashboard">View My Dashboard</Link>
           </Button>
           <span className="font-body text-accent text-xl">|</span>
           <Button asChild variant="link" className="font-body text-accent text-xl hover:underline">
            <Link href="/admin">Admin Panel</Link>
           </Button>
         </div>
       </div>
    </div>
  );
}
