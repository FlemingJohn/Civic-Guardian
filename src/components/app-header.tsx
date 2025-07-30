import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="border-b-4 border-accent py-4 px-6 bg-secondary sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Shield className="w-8 h-8 text-accent group-hover:animate-pulse" />
          <h1 className="text-2xl font-headline text-white group-hover:text-accent transition-colors">
            Civic Guardians
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" className="font-body text-lg hover:bg-transparent hover:text-accent">
            <Link href="/report-issue">Report Issue</Link>
          </Button>
          <Button asChild variant="ghost" className="font-body text-lg hover:bg-transparent hover:text-accent">
            <Link href="/stats">Public Stats</Link>
          </Button>
          <Button asChild variant="ghost" className="font-body text-lg hover:bg-transparent hover:text-accent">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="ghost" className="font-body text-lg hover:bg-transparent hover:text-accent">
            <Link href="/admin">Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
