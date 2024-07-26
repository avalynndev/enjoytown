"use client";
import { FetchMovieInfo } from "@/fetch";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Image as ImageIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function Airing() {
  const [data, setData] = React.useState<MovieData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        "https://consumet-jade.vercel.app/meta/anilist/airing-schedule",
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
              data.results.slice(0, 18).map((item: any, index: any) => (
                <Link
                  href={`/anime/${encodeURIComponent(item.id)}`}
                  key={index}
                  className="w-full cursor-pointer space-y-2"
                  data-testid="movie-card"
                >
                  <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
                    {item.cover ? (
                      <Image
                        fill
                        className="object-cover"
                        src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.cover}`}
                        alt={
                          item.title["english"] == null ||
                          !item.title["english"]
                            ? item.title["romaji"]
                            : item.title["english"]
                        }
                        sizes="100%"
                      />
                    ) : (
                      <ImageIcon className="text-muted" />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-1 justify-between">
                      <div className="justify-start">
                        <span className="trucate line-clamp-1">
                          {item.title["english"] == null ||
                          !item.title["english"]
                            ? item.title["romaji"]
                            : item.title["english"]}
                        </span>
                      </div>
                      <div className="justify-end flex items-center gap-2">
                        <Badge variant="outline">
                          {item.rating ? item.rating / 10 : "?"}
                        </Badge>
                        <Separator orientation="vertical" className="h-6" />
                        <Badge variant="secondary">
                          {item.episode ? item.episode : "?"}
                        </Badge>
                      </div>
                    </div>

                    <p className="line-clamp-3 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </main>
  );
}
