import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="border-b-4 border-accent py-4 px-6 bg-secondary sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Gamepad2 className="w-8 h-8 text-accent group-hover:animate-pulse" />
          <h1 className="text-2xl font-headline text-white group-hover:text-accent transition-colors">
            Pixel Pushers
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/report-issue">
            <Button variant="ghost" className="font-body text-lg hover:bg-transparent hover:text-accent">Report Issue</Button>
          </Link>
          <Link href="/stats">
            <Button variant="ghost" className="font-body text-lg hover:bg-transparent hover:text-accent">Public Stats</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="font-body text-lg hover:bg-transparent hover:text-accent">Dashboard</Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" className="font-body text-lg hover:bg-transparent hover:text-accent">Admin</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
