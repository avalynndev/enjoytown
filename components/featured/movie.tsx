"use client";
import { FetchMovieInfo } from "@/fetch";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Image as ImageIcon } from "lucide-react";
import { API_KEY, PROXY } from "@/config/url";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
};

type MovieData = {
  results: Movie[];
  total_pages: number;
  page: number;
};

type MovieListProps = {
  endpoint: string;
};

export default function FeaturedMovies({ endpoint }: MovieListProps) {
  const [data, setData] = React.useState<MovieData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `${PROXY}https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}&page=${currentPage}`,
        { next: { revalidate: 21600 } }
      );
      const data = await res.json();
      FetchMovieInfo(data);
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, [endpoint, currentPage]);

  const totalPages = data ? data.total_pages : 1;

  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
          {loading
            ? // Skeleton component while loading
              Array.from({ length: 18 }).map((_, index) => (
                <div key={index} className="w-full space-y-2">
                  <Skeleton className="aspect-video w-full rounded-md" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))
            : data &&
              data.results.map((item: any, index: any) => (
                <Link
                  href={`/movie/${encodeURIComponent(item.id)}`}
                  key={index}
                  className="w-full cursor-pointer space-y-2"
                  data-testid="movie-card"
                >
                  <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
                    {item.backdrop_path ? (
                      <Image
                        fill
                        className="object-cover"
                        src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                        alt={item.title}
                        sizes="100%"
                      />
                    ) : (
                      <ImageIcon className="text-muted" />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-1">
                      <span className="">{item.title}</span>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline">
                              {item.vote_average
                                ? item.vote_average.toFixed(1)
                                : "?"}
                            </Badge>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>{item.vote_count} votes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <p className="line-clamp-3 text-xs text-muted-foreground">
                      {item.overview}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
      {/* Pagination controls */}
      <Pagination className="pt-16">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((prev) => Math.max(prev - 1, 1));
              }}
              aria-disabled={currentPage <= 1}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={(e) => e.preventDefault()}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {totalPages > currentPage + 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((prev) => (data && prev < totalPages ? prev + 1 : prev));
              }}
              aria-disabled={data ? currentPage === totalPages : true}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
