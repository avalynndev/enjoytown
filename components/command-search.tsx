'use client';

import { ReactNode, useEffect, useState } from 'react';
import { CommandIcon, Filter } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getRecentSearchesFromLocalStorage, saveSearchToLocalStorage } from '@/components/storage';
import { Button } from '@/components/ui/button';
import { Command, CommandDialog, CommandInput, CommandList } from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { tmdb } from '@/lib/tmdb';
import { fetchAnimeSearch } from '@/lib/consumet';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ItemHoverCard } from '@/components/item-hover-card';
import { HoverCardPortal } from '@radix-ui/react-hover-card';
import Image from 'next/image';

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

type MovieResult = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
};

type TvResult = {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
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
  heading?: string;
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

type RecentSearch = {
  term: string;
  category: 'movie' | 'tv' | 'anime' | 'recent';
};

export const CommandSearch = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<'movie' | 'tv' | 'anime' | 'recent'>('movie');
  const [search, setSearch] = useState('');
  const [result, setResults] = useState<Result | null>({
    movies: [],
    tvShows: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [animeResults, setSearchResults] = useState<AnimeResult[] | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: void, ...args: any[]) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const pathName = usePathname();
  useEffect(() => {
    const searches = getRecentSearchesFromLocalStorage();
    setRecentSearches(searches);
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(async (text: string) => {
      if (category === 'recent') return;

      if (!text.trim()) {
        setResults({ movies: [], tvShows: [] });
        setSearchResults(null);
        return;
      }

      setIsLoading(true);

      if (category === 'movie') {
        const movieData = await tmdb.movies.search(text, 'en-US');
        setResults({ movies: movieData.results, tvShows: [] });
      } else if (category === 'tv') {
        const tvData = await tmdb.tv.search(text, 'en-US');
        setResults({ movies: [], tvShows: tvData.results });
      } else if (category === 'anime') {
        const animeData = await fetchAnimeSearch(text);
        setSearchResults(animeData.results);
        setResults({ movies: [], tvShows: [] });
      }

      setIsLoading(false);
    }, 500);

    debouncedSearch(search);
  }, [search, category]);

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
  const hasAnimeResults = animeResults?.length ?? 0 > 0;

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveSearchToLocalStorage(search, category);
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
        <div className="flex items-center space-x-2 px-4 pt-4">
          <Select
            onValueChange={(value) => setCategory(value as 'movie' | 'tv' | 'anime' | 'recent')}
            defaultValue="movie"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="movie">Movie</SelectItem>
                <SelectItem value="tv">TV</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="recent">Recent Searches</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button disabled size="icon">
            <Filter />
          </Button>
        </div>

        <Command>
          <CommandInput
            placeholder="Search"
            onValueChange={setSearch}
            value={search}
            onKeyDown={handleSearchSubmit}
          />

          <CommandList>
            {!search && (
              <div className={`px-4 pt-4 ${category === 'recent' ? '' : 'pb-4'}`}>
                <div className="text-muted-foreground bg-muted/50 rounded-sm p-2 text-xs">
                  💡 <strong>Tip:</strong> Press <kbd>Enter</kbd> after typing to save a search. It
                  will appear in recent searches so you can quickly access it later.
                </div>
              </div>
            )}

            {isLoading && (
              <div className="space-y-8">
                <CommandSearchGroup>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CommandSearchSkeleton key={index} />
                  ))}
                </CommandSearchGroup>
              </div>
            )}

            {category === 'recent' && recentSearches.length > 0 && (
              <CommandSearchGroup>
                {recentSearches.map((item, index) => (
                  <div
                    key={index}
                    className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
                    onClick={() => {
                      setCategory(item.category);
                      setSearch(item.term);
                    }}
                  >
                    <span className="truncate text-sm whitespace-nowrap">{item.term}</span>
                    <span className="text-muted-foreground text-xs whitespace-nowrap capitalize">
                      {item.category}
                    </span>
                  </div>
                ))}
              </CommandSearchGroup>
            )}

            {!isLoading && (hasMovies || hasTvSeries || hasAnimeResults) && category != 'recent' ? (
              <div>
                {hasMovies && (
                  <CommandSearchGroup>
                    {result.movies.map((item) => (
                      <HoverCard key={item.id}>
                        <HoverCardTrigger>
                          <Link
                            href={`/movie/${item.id}`}
                            className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
                          >
                            <span className="truncate text-sm whitespace-nowrap">{item.title}</span>

                            <span className="text-muted-foreground text-xs whitespace-nowrap">
                              {item.release_date && new Date(item.release_date).getFullYear()}
                            </span>
                          </Link>
                        </HoverCardTrigger>

                        <HoverCardPortal>
                          <HoverCardContent
                            className="w-[320px] overflow-hidden rounded-lg p-0"
                            side="top"
                            align="start"
                          >
                            <ItemHoverCard.Banner className="aspect-video">
                              {item.backdrop_path && (
                                <Image
                                  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                  alt={item.title}
                                  fill
                                />
                              )}
                            </ItemHoverCard.Banner>

                            <ItemHoverCard.Information>
                              <ItemHoverCard.Poster>
                                {item.poster_path && (
                                  <Image
                                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                )}
                              </ItemHoverCard.Poster>

                              <ItemHoverCard.Summary>
                                <ItemHoverCard.Title>{item.title}</ItemHoverCard.Title>

                                <ItemHoverCard.Overview>{item.overview}</ItemHoverCard.Overview>
                              </ItemHoverCard.Summary>
                            </ItemHoverCard.Information>
                          </HoverCardContent>
                        </HoverCardPortal>
                      </HoverCard>
                    ))}
                  </CommandSearchGroup>
                )}

                {hasTvSeries && (
                  <CommandSearchGroup>
                    {result.tvShows.map((item) => (
                      <HoverCard key={item.id}>
                        <HoverCardTrigger>
                          <Link
                            className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
                            href={`/tv/${item.id}`}
                          >
                            <span className="truncate text-sm whitespace-nowrap">{item.name}</span>

                            <span className="text-muted-foreground text-xs whitespace-nowrap">
                              {item.first_air_date && new Date(item.first_air_date).getFullYear()}
                            </span>
                          </Link>
                        </HoverCardTrigger>

                        <HoverCardPortal>
                          <HoverCardContent
                            className="w-[320px] overflow-hidden rounded-lg p-0"
                            side="top"
                            align="start"
                          >
                            <ItemHoverCard.Banner className="aspect-video">
                              {item.backdrop_path && (
                                <Image
                                  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                  alt={item.name}
                                  fill
                                />
                              )}
                            </ItemHoverCard.Banner>

                            <ItemHoverCard.Information>
                              <ItemHoverCard.Poster>
                                {item.poster_path && (
                                  <Image
                                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                    alt={item.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                )}
                              </ItemHoverCard.Poster>

                              <ItemHoverCard.Summary>
                                <ItemHoverCard.Title>{item.name}</ItemHoverCard.Title>

                                <ItemHoverCard.Overview>{item.overview}</ItemHoverCard.Overview>
                              </ItemHoverCard.Summary>
                            </ItemHoverCard.Information>
                          </HoverCardContent>
                        </HoverCardPortal>
                      </HoverCard>
                    ))}
                  </CommandSearchGroup>
                )}

                {hasAnimeResults && (
                  <CommandSearchGroup>
                    {animeResults?.map((item) => (
                      <HoverCard key={item.id}>
                        <HoverCardTrigger>
                          <Link
                            className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
                            href={`/anime/${item.id}`}
                          >
                            <span className="truncate text-sm whitespace-nowrap">
                              {item.title.userPreferred || item.title.english || item.title.romaji}
                            </span>

                            <span className="text-muted-foreground text-xs whitespace-nowrap">
                              Episodes: {item.totalEpisodes}
                            </span>
                          </Link>{' '}
                        </HoverCardTrigger>
                        <HoverCardPortal>
                          <HoverCardContent
                            className="w-[320px] overflow-hidden rounded-lg p-0"
                            side="top"
                            align="start"
                          >
                            <ItemHoverCard.Banner className="aspect-[16/6]">
                              {item.cover && (
                                <Image
                                  src={item.cover}
                                  alt={
                                    item.title.userPreferred ||
                                    item.title.english ||
                                    item.title.romaji
                                  }
                                  fill
                                />
                              )}
                            </ItemHoverCard.Banner>

                            <ItemHoverCard.Information>
                              <ItemHoverCard.Poster>
                                {item.image && (
                                  <Image
                                    src={item.image}
                                    alt={
                                      item.title.userPreferred ||
                                      item.title.english ||
                                      item.title.romaji
                                    }
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                )}
                              </ItemHoverCard.Poster>

                              <ItemHoverCard.Summary>
                                <ItemHoverCard.Title>
                                  {item.title.userPreferred ||
                                    item.title.english ||
                                    item.title.romaji}
                                </ItemHoverCard.Title>

                                <ItemHoverCard.Overview>{item.description}</ItemHoverCard.Overview>
                              </ItemHoverCard.Summary>
                            </ItemHoverCard.Information>
                          </HoverCardContent>
                        </HoverCardPortal>
                      </HoverCard>
                    ))}
                  </CommandSearchGroup>
                )}
              </div>
            ) : (
              !isLoading &&
              search &&
              category != 'recent' && <p className="p-8 text-center">No results found.</p>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};
