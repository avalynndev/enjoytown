import Link from 'next/link';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Clapperboard } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-lg shadow-xs lg:mb-4 lg:border">
      <div className="border-t p-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="flex items-center gap-2">
            <Clapperboard size={20} />
            <h2 className="text-md font-normal">Enjoytown</h2>
          </div>

          <div className="flex items-center gap-2">
            <Link href="https://1anime.co">
              <p className="text-muted-foreground text-xs">© 2024-2025 1Anime & avalynndev</p>
            </Link>
            <div className="h-3 border-r" />

            <span className="text-muted-foreground text-xs">
              Data provided by Consumet and Tmdb API
            </span>
          </div>

          <div className="flex items-center gap-2 [&_a]:rounded-full [&_a]:border [&_a]:px-3 [&_a]:py-1 [&_a]:shadow-sm">
            <Link href="https://github.com/avalynndev/enjoytown">
              <GitHubLogoIcon />
            </Link>

            <Link href="https://x.com/avalynndev">
              <TwitterLogoIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
