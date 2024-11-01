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

type TVFeatureType = "airingtoday" | "ontheair" | "popular" | "toprated";

type TVFeatureProps = {
  featureType: TVFeatureType;
};


export default async function FeaturedTV({ featureType }: TVFeatureProps) {

  let res;
  switch (featureType) {
    case "airingtoday":
      res = await fetch(Tv_AiringToday, { next: { revalidate: 21600 } });
      break;
    case "ontheair":
      res = await fetch(Tv_OntheAir, { next: { revalidate: 21600 } });
      break;
    case "popular":
      res = await fetch(Tv_Popular, { next: { revalidate: 21600 } });
      break;
    case "toprated":
      res = await fetch(Tv_TopRated, { next: { revalidate: 21600 } });
      break;
  }

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

