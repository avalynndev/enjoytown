import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Clapperboard } from 'lucide-react';
import { CommandSearch } from './command-search';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const isSearchPage = pathname.includes('/search');

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {isMobile ? <Clapperboard className="-ml-1" /> : <SidebarTrigger className="-ml-1" />}
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="w-96 justify-start">
          {isMobile || isSearchPage ? (
            <h1 className="text-base font-medium">Enjoytown</h1>
          ) : (
            <CommandSearch />
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
