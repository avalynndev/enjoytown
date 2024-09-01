"use client";
import { ReactNode, useEffect, useState } from "react";
import { CommandIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Movie_Search, Tv_Search } from "@/config/url";
import { FetchMovieInfo } from "@/fetch";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [search, setSearch] = useState("");
  const [result, setResults] = useState<Result | null>({
    movies: [],
    tvShows: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: void, ...args: any[]) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const pathName = usePathname();

  const fetch_results = async (title: string) => {
    setIsLoading(true);
    if (title) {
      const [movieData, tvData] = await Promise.all([
        get_movie_results(title),
        get_tv_results(title),
      ]);
      const combinedResults = {
        movies: movieData.results,
        tvShows: tvData.results,
      };
      FetchMovieInfo(combinedResults);
      setResults(combinedResults);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetch_results, 500);
    debouncedFetch(search);
  }, [search]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) setOpen(false);
  }, [pathName]);

  const hasMovies = result?.movies && result?.movies?.length > 0;
  const hasTvSeries = result?.tvShows && result.tvShows.length > 0;


  return (
    <>
      <Button
        variant="outline"
        className="flex w-full flex-1 justify-between gap-2 pr-2 text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        Search
        <div className="mobile:hidden flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
          <CommandIcon size={12} />K
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Search"
            onValueChange={setSearch}
            value={search}
          />

          <CommandList>
            {isLoading && (
              <div className="space-y-8">
                <CommandSearchGroup heading="Movies">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CommandSearchSkeleton key={index} />
                  ))}
                </CommandSearchGroup>

                <CommandSearchGroup heading="TV Shows">
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
                        href={`/movies/${item.id}`}
                        className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 hover:bg-muted"
                      >
                        <span className="truncate whitespace-nowrap text-sm">
                          {item.title}
                        </span>

                        <span className="whitespace-nowrap text-xs text-muted-foreground">
                          {item.release_date &&
                            new Date(item.release_date).getFullYear()}
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
                        className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 hover:bg-muted"
                        href={`/tv-series/${item.id}`}
                      >
                        <span className="truncate whitespace-nowrap text-sm">
                          {item.name}
                        </span>

                        <span className="whitespace-nowrap text-xs text-muted-foreground">
                          {item.first_air_date &&
                            new Date(item.first_air_date).getFullYear()}
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

const get_movie_results = async (title: string) => {
  const res = await fetch(Movie_Search + title, {
    next: { revalidate: 21600 },
  });
  return res.json();
};

const get_tv_results = async (title: string) => {
  const res = await fetch(Tv_Search + title, {
    next: { revalidate: 21600 },
  });
  return res.json();
};
