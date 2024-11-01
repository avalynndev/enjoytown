"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import * as React from "react";
import { FetchMovieInfo } from "@/fetch";
import Marquee from "@/components/ui/marquee";
import { API_KEY, PROXY } from "@/config/url";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { Image as ImageIcon } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
};

type Tv = {
  id: number;
  name: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
};

type TvData = {
  results: Tv[];
};

type MovieData = {
  results: Movie[];
};

export interface CardProps {
  item: Movie | Tv; // Allow both Movie and Tv for flexibility
}

export function Card({ item }: CardProps) {
  const title = "title" in item ? item.title : item.name; // Handle both Movie and Tv titles
  const backdropPath = item.backdrop_path
    ? `${PROXY}https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : null;

  return (
    <Link
      href={`/movie/${item.id}`} // Ensure the correct URL based on the item type
      className="flex flex-col gap-2 group relative overflow-hidden cursor-pointer max-w-xs md:max-w-sm"
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
        {backdropPath ? (
          <Image
            fill
            className="object-cover rounded-xl"
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
          <span className="font-semibold text-sm">{title}</span>
          <Badge variant="outline">
            {item.vote_average ? item.vote_average.toFixed(1) : "?"}
          </Badge>
        </div>

        <p className="line-clamp-3 text-xs text-muted-foreground">
          {item.overview || (
            <>
              No description is available for this item at the moment. Please
              check back later or search up somewhere else 
            </>
          )}
        </p>
      </div>
    </Link>
  );
}

export default function HeroSection() {
  const [movieData, setMovieData] = React.useState<MovieData | null>(null);
  const [tvData, setTVData] = React.useState<TvData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(
            `${PROXY}https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
            {
              next: { revalidate: 21600 },
            }
          ),
          fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`, {
            next: { revalidate: 21600 },
          }),
        ]);

        if (!movieRes.ok || !tvRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const movieData: MovieData = await movieRes.json();
        const tvData: TvData = await tvRes.json();

        FetchMovieInfo(movieData);
        setTVData(tvData);
        setMovieData(movieData);
        setError(null); // Reset error state if fetch is successful
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
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
          <div className="flex justify-center items-center py-14">
            <Spinner size="large" />
          </div>
        )}
        <Marquee pauseOnHover className="max-w-screen [--duration:40s]">
          {movieData?.results.slice(0, 10).map((movie) => (
            <Card key={movie.id} item={movie} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="max-w-screen [--duration:40s] mt-10"
        >
          {tvData?.results.slice(0, 10).map((tv) => (
            <Card key={tv.id} item={tv} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/12 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
