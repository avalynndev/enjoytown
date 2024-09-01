"use client";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import { FetchMovieInfo } from "@/fetch";
import { API_KEY } from "@/config/url";

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
};
export const TopMovies = () => {
  const [data, setData] = React.useState<MovieData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
        { next: { revalidate: 21600 } }
      );
      const data = await res.json();
      FetchMovieInfo(data);
      setData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto mb-64 grid max-w-6xl grid-cols-3">
      {data &&
        data.results.slice(0, 3).map((movie: any, index: any) => {
          return (
            <Link
              className={twMerge(
                "overflow-hidden rounded-[5%] transition-all",

                "first:translate-x-[60px] first:translate-y-[30px] first:rotate-[-10deg] lg:first:translate-x-[120px] lg:first:translate-y-[75px] lg:first:rotate-[-10deg]",

                "last:translate-x-[-60px] last:translate-y-[30px] last:rotate-[10deg] lg:last:translate-x-[-120px] lg:last:translate-y-[75px] lg:last:rotate-[10deg]",

                "[&:nth-child(2)]:z-40"
              )}
              href={`/movie/${movie.id}`}
              key={movie.id}
            >
              <div className="relative aspect-poster rounded-3xl">
                <Image
                  src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  fill
                  quality={100}
                  alt={movie.title}
                />
              </div>
            </Link>
          );
        })}
    </div>
  );
};
