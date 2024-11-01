import { PROXY, Tv_AiringToday, Tv_OntheAir, Tv_Popular, Tv_TopRated } from "@/config/url";
import { FetchMovieInfo } from "@/fetch";
import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import React from "react";

type TVFeatureType = "airingtoday" | "ontheair" | "popular" | "toprated";

type TVFeatureProps = {
  featureType: TVFeatureType;
};


export default async function FeaturedTV({ featureType }: TVFeatureProps) {
  let url = "";
  switch (featureType) {
    case "airingtoday":
      url = Tv_AiringToday;
      break;
    case "ontheair":
      url = Tv_OntheAir;
      break;
    case "popular":
      url = Tv_Popular;
      break;
    case "toprated":
      url = Tv_TopRated;
      break;
  }

  const res = await fetch(url, { next: { revalidate: 21600 } });
  const data = await res.json();

  FetchMovieInfo(res);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
          {data &&
            data.results.slice(0, 18).map((item: any, index: any) => (
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
                      src={`${PROXY}https://image.tmdb.org/t/p/original${item.backdrop_path}`}
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
    </main>
  );
}
