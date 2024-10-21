import { Tv_TopRated } from "@/config/url";
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

export default async function Popular() {
  const data = await get_toprated();
  FetchMovieInfo(data);

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
                      src={`${process.env.GOOD_PROXY_URL}/fetch?url=https://image.tmdb.org/t/p/original${item.backdrop_path}`}
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

const get_toprated = async () => {
  const res = await fetch(Tv_TopRated, { next: { revalidate: 21600 } });
  const data = await res.json();
  return data;
};
