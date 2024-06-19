import { format } from "date-fns";
import { Poster } from "@/components/poster";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import VideoPlayer from "@/components/movie/containers/videoplayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils'

const DetailsContainer = ({ data,id }: any) => {
  const embed = false;
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
              backgroundImage: `url('https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${data.backdrop_path}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-full w-full brightness-50"
            data-testid="banner"
          />
        </div>

        <div className="mx-auto my-8 max-w-4xl space-y-8 p-4 md:space-y-12 md:p-0 ">
          <main className="flex flex-col gap-4 md:flex-row">
            <aside className="-mt-24 w-full space-y-2 lg:-mt-32 md:w-1/2 lg:w-1/3">
              <Poster url={data.poster_path} alt={data.title} />
            </aside>

            <article className="flex w-full flex-col gap-2 md:w-2/3">
              {data.release_date && (
                <span className="text-xs text-muted-foreground">
                  {format(new Date(data.release_date), "PPP", {})}
                </span>
              )}

              <h1 className="text-lg font-bold md:text-4xl">{data.title}</h1>

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

              {/**<div className="flex flex-wrap items-center gap-1">
                Watch Providers
              </div>/ */}
            </article>
          </main>

          <Tabs defaultValue="watch">
            <div className="scrollbar-hide">
              <TabsList>
                <TabsTrigger value="watch">Watch</TabsTrigger>
                <TabsTrigger disabled value="credits">
                  Credits
                </TabsTrigger>
                <TabsTrigger disabled value="images">
                  Images
                </TabsTrigger>
                <TabsTrigger disabled value="videos">
                  Videos
                </TabsTrigger>
                <TabsTrigger value="download">Download</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="watch" className="mt-4">
              <VideoPlayer id={id} />
            </TabsContent>
            <TabsContent value="credits" className="mt-4">
              Credits
            </TabsContent>

            <TabsContent value="images" className="mt-4">
              IMAges
            </TabsContent>

            <TabsContent value="videos" className="mt-4">
              videos
            </TabsContent>
            <TabsContent value="download" className="mt-4">
              <div className="pb-4">
                <div className="flex flex-col text-center items-center justify-center">
                  <Link href={`https://dl.vidsrc.vip/movie/${id}`}>
                    <Button>Download Movie</Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
