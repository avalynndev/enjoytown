import { format } from "date-fns";
import { Poster } from "@/components/common/poster";
import Link from "next/link";
import { Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { tmdb } from "@/lib/tmdb";

const DetailsContainer = async({ data, id, embed }: any) => {
  const trailers = (await tmdb.videos("tv", id)).results
    .filter(video => video.type === "Trailer" && video.site === "YouTube");

  return (
    <div className="">
      <div className={cn("mx-auto max-w-6xl", embed ? "p-0" : "md:pt-4")}>
        <div
          className={cn(
            "h-[30dvh] w-full overflow-hidden border bg-muted shadow md:rounded-lg lg:h-[55dvh]",
            embed ? "max-h-[20vh] md:max-h-[50vh]" : undefined
          )}
        >
          <div
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-full w-full brightness-50"
            data-testid="banner"
          />
        </div>

        <div className="mx-auto my-8 max-w-4xl space-y-8 p-4 md:space-y-12 md:p-0 ">
          <main className="flex flex-col gap-4 md:flex-row">
            <aside className="-mt-24 w-full space-y-2  md:-mt-32 md:w-1/3">
              <Poster url={data.poster_path} alt={data.title} />
            </aside>

            <article className="flex w-full flex-col gap-2 md:w-2/3">
              {data.release_date && (
                <span className="text-xs text-muted-foreground">
                  {format(new Date(data.release_date), "PPP", {})}
                </span>
              )}

              <h1 className="text-lg font-bold md:text-4xl">{data.name}</h1>

              <div className="flex flex-wrap items-center gap-2">
                {data.genres.length > 0 && (
                  <>
                    {data.genres.map((genre: any) => {
                      return (
                        <Badge
                          key={genre.id}
                          variant="outline"
                          className="whitespace-nowrap"
                        >
                          {genre.name}
                        </Badge>
                      );
                    })}

                    <Separator orientation="vertical" className="h-6" />
                  </>
                )}

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge>{data.vote_average.toFixed(1)}</Badge>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>{data.vote_count} votes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">
                {data.overview}
              </p>

              <div className="flex flex-wrap items-center gap-1">
                {trailers.length > 0 && (
                  <Link href={`https://www.youtube.com/watch?v=${trailers[0].key}`} target="_blank" >
                    <Badge
                      variant="outline"
                      className="cursor-pointer whitespace-nowrap"
                    >
                      <Play className="mr-1.5" size={12} />
                      Trailer
                    </Badge>
                  </Link>
                )}
                <Link href={`/tv/watch/${id}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer whitespace-nowrap"
                  >
                    <Play className="mr-1.5" size={12} />
                    Watch
                  </Badge>
                </Link>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
