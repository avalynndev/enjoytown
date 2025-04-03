'use client';

import { ReactNode, useEffect, useState, useCallback } from 'react';
import { CommandIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getRecentSearchesFromLocalStorage, saveSearchToLocalStorage } from '@/components/storage';
import { Button } from '@/components/ui/button';
import { Command, CommandDialog, CommandInput, CommandList } from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { FetchAnimeInfo, fetchDramaSearch } from '@/lib/consumet';
import { tmdb } from '@/lib/tmdb';

type AnimeResult = {
  id: string;
  malId: number | null;
  title: {
    romaji: string;
    english: string | null;
    native: string;
    userPreferred: string;
  };
  status: string;
  image: string;
  cover: string;
  popularity: number;
  description: string;
  rating: number | null;
  genres: string[];
  color: string;
  totalEpisodes: number | null;
  currentEpisodeCount: number | null;
  type: string;
  releaseDate: number | null;
};

type DramaResult = {
  id: string;
  title: string;
  url: string;
  image: string;
};

type MovieResult = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
};

type TvResult = {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string;
};

type Result = {
  movies: Array<MovieResult>;
  tvShows: Array<TvResult>;
};

const CommandSearchSkeleton = () => (
  <div className="flex items-center justify-between gap-4 rounded-sm p-2">
    <Skeleton className="h-[2ex] w-[20ch]" />
    <Skeleton className="h-[2ex] w-[4ch]" />
  </div>
);

type CommandSearchGroupProps = {
  heading: string;
  children: ReactNode;
};

const CommandSearchGroup = ({ children, heading }: CommandSearchGroupProps) => {
  return (
    <div className="space-y-2 p-4">
      <h4 className="text-sm font-bold">{heading}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};

export const CommandSearch = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [result, setResults] = useState<Result | null>({
    movies: [],
    tvShows: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dramaResults, setDramaResults] = useState<DramaResult[] | null>(null);
  const [animeResults, setSearchResults] = useState<AnimeResult[] | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // State for recent searches

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: void, ...args: any[]) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchDramaResults = async (title: string) => {
    setIsLoading(true);
    if (title) {
      const data = await fetchDramaSearch(title); // Fetch drama search results
      FetchAnimeInfo(data); // Process the fetched info if needed
      setDramaResults(data.results); // Set the drama results
    }
    setIsLoading(false);
  };

  // Trigger drama search on input change
  useEffect(() => {
    const debouncedFetch = debounce(fetchDramaResults, 500);
    debouncedFetch(search);
  }, [search]);

  const fetchAnimeResults = async (text: string) => {
    setIsLoading(true);
    if (text) {
      const res = await fetch(`https://api-consumet-org-jet.vercel.app/meta/anilist/` + text, {
        next: { revalidate: 21600 },
      });
      const data = await res.json();
      setSearchResults(data.results);
    }
    setIsLoading(false);
  };

  // Trigger search on input change
  useEffect(() => {
    const debouncedFetch = debounce(fetchAnimeResults, 500);
    debouncedFetch(search);
  }, [search]);

  const pathName = usePathname();
  useEffect(() => {
    // Load recent searches from local storage on mount
    const searches = getRecentSearchesFromLocalStorage();
    setRecentSearches(searches);
  }, []);

  const fetchResults = useCallback(async (title: string) => {
    setIsLoading(true);
    if (title) {
      const [movieData, tvData] = await Promise.all([
        tmdb.movies.search(title, 'en-US'),
        tmdb.tv.search(title, 'en-US'),
      ]);
      const combinedResults = {
        movies: movieData.results,
        tvShows: tvData.results,
      };
      setResults(combinedResults);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(fetchResults, 500);
    debouncedFetch(search);
  }, [search, fetchResults]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (open) setOpen(false);
  }, [pathName]);

  const hasMovies = result?.movies && result?.movies?.length > 0;
  const hasTvSeries = result?.tvShows && result.tvShows.length > 0;
  const hasDramaResults = dramaResults?.length ?? 0 > 0;
  const hasAnimeResults = animeResults?.length ?? 0 > 0;

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveSearchToLocalStorage(search);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="text-muted-foreground flex w-full flex-1 justify-between gap-2 pr-2 text-sm"
        onClick={() => setOpen(true)}
      >
        Search Anything
        <div className="mobile:hidden bg-muted text-muted-foreground flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px]">
          <CommandIcon size={12} />K
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Search"
            onValueChange={setSearch}
            value={search}
            onKeyDown={handleSearchSubmit}
          />

          <CommandList>
            {recentSearches && (
              <CommandSearchGroup heading="Recent Searches">
                {recentSearches.map((item, index) => (
                  <div
                    key={index}
                    className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
                    onClick={() => setSearch(item)}
                  >
                    <span className="truncate text-sm whitespace-nowrap">{item}</span>
                  </div>
                ))}
              </CommandSearchGroup>
            )}

            {isLoading && (
              <div className="space-y-8">
                <CommandSearchGroup heading="Movies">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CommandSearchSkeleton key={index} />
                  ))}
                </CommandSearchGroup>

                <CommandSearchGroup heading="Tv Shows">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CommandSearchSkeleton key={index} />
                  ))}
                </CommandSearchGroup>

                <CommandSearchGroup heading="Drama">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CommandSearchSkeleton key={index} />
                  ))}
                </CommandSearchGroup>

                <CommandSearchGroup heading="Anime">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CommandSearchSkeleton key={index} />
                  ))}
                </CommandSearchGroup>
              </div>
            )}

            {!isLoading && result ? (
              <div>
                {hasMovies && (
                  <CommandSearchGroup heading="Movies">
                    {result.movies.map((item) => (
                      <Link
                        key={item.id}
                        href={`/movie/${item.id}`}
                        className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
                      >
                        <span className="truncate text-sm whitespace-nowrap">{item.title}</span>

                        <span className="text-muted-foreground text-xs whitespace-nowrap">
                          {item.release_date && new Date(item.release_date).getFullYear()}
                        </span>
                      </Link>
                    ))}
                  </CommandSearchGroup>
                )}

                {hasTvSeries && (
                  <CommandSearchGroup heading="TV Shows">
                    {result.tvShows.map((item) => (
                      <Link
                        key={item.id}
                        className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
                        href={`/tv/${item.id}`}
                      >
                        <span className="truncate text-sm whitespace-nowrap">{item.name}</span>

                        <span className="text-muted-foreground text-xs whitespace-nowrap">
                          {item.first_air_date && new Date(item.first_air_date).getFullYear()}
                        </span>
                      </Link>
                    ))}
                  </CommandSearchGroup>
                )}

                {hasDramaResults && (
                  <CommandSearchGroup heading="Drama">
                    {dramaResults?.map((item) => (
                      <Link
                        key={item.id}
                        className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
                        href={`/drama/${item.id}`}
                      >
                        <span className="truncate text-sm whitespace-nowrap">{item.title}</span>
                      </Link>
                    ))}
                  </CommandSearchGroup>
                )}

                {hasAnimeResults && (
                  <CommandSearchGroup heading="Anime">
                    {animeResults?.map((item) => (
                      <Link
                        key={item.id}
                        className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
                        href={`/anime/${item.id}`}
                      >
                        <span className="truncate text-sm whitespace-nowrap">
                          {item.title.userPreferred || item.title.english || item.title.romaji}
                        </span>

                        <span className="text-muted-foreground text-xs whitespace-nowrap">
                          Episodes: {item.totalEpisodes}
                        </span>
                      </Link>
                    ))}
                  </CommandSearchGroup>
                )}
              </div>
            ) : (
              !isLoading && <p className="p-8 text-center">No Results</p>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};
