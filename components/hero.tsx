'use client';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import * as React from 'react';
import Marquee from '@/components/ui/marquee';
import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';
import { Image as ImageIcon } from 'lucide-react';
import { tmdb, TvSerie, Movie } from '@/lib/tmdb';
import { ListResponse } from '@/lib/tmdb/utils/list-response';

export interface CardProps {
  item: Movie | TvSerie; // Allow both Movie and Tv for flexibility
  type: string;
}

export function Card({ item, type }: CardProps) {
  const title = 'title' in item ? item.title : item.name; // Handle both Movie and Tv titles
  const backdropPath = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : null;

  return (
    <Link
      href={`/${type == 'Tv' ? 'tv' : 'movie'}/${item.id}`} // Ensure the correct URL based on the item type
      className="group relative flex max-w-xs cursor-pointer flex-col gap-2 overflow-hidden md:max-w-sm"
    >
      <div className="bg-background/50 relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border shadow-sm">
        {backdropPath ? (
          <Image
            fill
            className="rounded-xl object-cover"
            src={backdropPath}
            alt={title}
            sizes="100%"
          />
        ) : (
          <ImageIcon className="text-muted" />
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-1">
          <span className="text-sm font-semibold">{title}</span>
          <Badge variant="outline">{item.vote_average ? item.vote_average.toFixed(1) : '?'}</Badge>
        </div>

        <p className="text-muted-foreground line-clamp-3 text-xs">
          {item.overview || (
            <>
              No description is available for this item at the moment. Please check back later or
              search up somewhere else
            </>
          )}
        </p>
      </div>
    </Link>
  );
}

export default function HeroSection() {
  const [movieData, setMovieData] = React.useState<ListResponse<Movie> | null>(null);
  const [tvData, setTVData] = React.useState<ListResponse<TvSerie> | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movies, tvs] = await Promise.all([
          tmdb.movies.popular('en-US'),
          tmdb.tv.popular('en-US'),
        ]);
        setTVData(tvs);
        setMovieData(movies);
        setError(null); // Reset error state if fetch is successful
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="py-14 text-center text-red-500">
        <p>Failed to load data: {error}</p>
      </div>
    );
  }

  return (
    <section id="showcase" className="container py-14">
      <div className="relative flex flex-col">
        {loading && (
          <div className="flex items-center justify-center py-14">
            <Spinner size="large" />
          </div>
        )}
        <Marquee pauseOnHover className="max-w-screen [--duration:40s]">
          {movieData?.results
            .slice(0, 10)
            .map((movie) => <Card key={movie.id} item={movie} type="Movie" />)}
        </Marquee>
        <Marquee reverse pauseOnHover className="mt-10 max-w-screen [--duration:40s]">
          {tvData?.results.slice(0, 10).map((tv) => <Card key={tv.id} item={tv} type="Tv" />)}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-linear-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 h-full w-1/12 bg-linear-to-l"></div>
      </div>
    </section>
  );
}
