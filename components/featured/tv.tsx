'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Loading from './loading-featured';
import { tmdb, TvSerie, TvSeriesListType } from '@/lib/tmdb';
import { ListResponse } from '@/lib/tmdb/utils/list-response';

type FeaturedTVProps = {
  featureType: TvSeriesListType;
};

export default function FeaturedTV({ featureType }: FeaturedTVProps) {
  const [data, setData] = React.useState<ListResponse<TvSerie> | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await tmdb.tv.list({
        list: featureType,
        language: 'en-US',
        page: currentPage,
      });

      setData(data);
      setLoading(false);
    };

    fetchData();
  }, [featureType, currentPage]);
  const totalPages = data ? data.total_pages : 1;

  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
          {loading ? (
            <Loading />
          ) : (
            data &&
            data.results.map((item: any, index: any) => (
              <Link
                href={`/tv/${encodeURIComponent(item.id)}`}
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
                      alt={item.name}
                      sizes="100%"
                    />
                  ) : (
                    <ImageIcon className="text-muted" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <span className="">{item.name}</span>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline">
                            {item.vote_average ? item.vote_average.toFixed(1) : '?'}
                          </Badge>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>{item.vote_count} votes</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <p className="line-clamp-3 text-xs text-muted-foreground">{item.overview}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
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
            <PaginationLink onClick={(e) => e.preventDefault()}>{currentPage}</PaginationLink>
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
