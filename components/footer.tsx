import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-lg shadow-lg lg:mb-4 lg:border">
      <div className="border-t p-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="flex items-center gap-3">
            <Clapperboard size={24} />
            <h2 className="text-lg font-semibold">EnjoyTown</h2>
          </div>

          <div className="flex items-center gap-3">
            <Link href="https://aniverse.lostnova.space">
              <p className="text-muted-foreground text-sm">© 2024-2025 AniVerse Pte Ltd</p>
            </Link>
            <div className="h-4 border-r" />

            <span className="text-muted-foreground text-sm">
              EnjoyTown doesn&apos;t store any media listed; we only link to third-party sources.
            </span>
          </div>
        </div>
        <div className="text-muted-foreground mt-4 text-sm">
          <Link href="https://1ani.me/privacy">Privacy Policy</Link> |{' '}
          <Link href="https://1ani.me/dmca">DMCA</Link>
        </div>
      </div>
    </div>
  );
};
