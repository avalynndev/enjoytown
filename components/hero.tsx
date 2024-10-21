"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import * as React from "react";
import { FetchMovieInfo } from "@/fetch";
import { API_KEY } from "@/config/url";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { Image as ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  overview: string;
};

type MovieData = {
  results: Movie[];
};

export interface CardProps {
  item: Movie;
}

export function Card({ item }: CardProps) {
  return (
    <Link
      href={`/movie/${item.id}`}
      className="flex flex-col gap-2 group relative overflow-hidden cursor-pointer max-w-xs md:max-w-sm" // Set max width
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
        {item.backdrop_path ? ( // Check if backdrop path exists
          <Image
            fill
            className="object-cover rounded-xl"
            src={`${process.env.GOOD_PROXY_URL}/fetch?url=https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt={item.title}
            sizes="100%"
          />
        ) : (
          <ImageIcon className="text-muted" />
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-1">
          <span className="font-semibold text-sm">{item.title}</span>

          <Badge variant="outline">
            {item.vote_average ? item.vote_average.toFixed(1) : "?"}
          </Badge>
        </div>

        <p className="line-clamp-3 text-xs text-muted-foreground">
          {item.overview}
        </p>
      </div>
    </Link>
  );
}

export default function HeroSection() {
  const [data, setData] = React.useState<MovieData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
          { next: { revalidate: 21600 } }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data: MovieData = await res.json();
        FetchMovieInfo(data); // This function might be external
        setData(data);
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
        <p>Failed to load movies: {error}</p>
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
          {data?.results.slice(0, 10).map((movie: Movie) => (
            <Card key={movie.id} item={movie} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="max-w-screen [--duration:40s] mt-10"
        >
          {data?.results.slice(0, 10).map((movie: Movie) => (
            <Card key={movie.id} item={movie} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/12 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
