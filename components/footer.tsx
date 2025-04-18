import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="mt-4 w-full border-t">
      <div className="mx-auto max-w-6xl py-4">
        <div className="flex flex-col justify-between gap-4 px-4 md:flex-row xl:px-0">
          <div className="flex items-center gap-2">
            <Clapperboard size={24} />

            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} AniVerse Pte Ltd
            </p>

            <div className="h-3 border-r" />

            <span className="text-muted-foreground text-xs">
              EnjoyTown doesn't store any media listed; we only link to third-party sources.
            </span>
          </div>

          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <Link href="https://1ani.me/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>

            <Link href="https://1ani.me/dmca" className="hover:text-foreground">
              DMCA
            </Link>

            <Link href="https://github.com/avalynndev/enjoytown" className="hover:text-foreground">
              Github
            </Link>

            <Link href="https://x.com/avalynndev" className="hover:text-foreground">
              X
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};