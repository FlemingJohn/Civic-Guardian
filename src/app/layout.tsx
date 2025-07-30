import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/app-header';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Pixel Pushers',
  description: 'Report and track community issues, the retro way.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="min-h-screen bg-black text-white flex flex-col">
          <AppHeader />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
