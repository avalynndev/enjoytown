import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Watch from "@/components/containers/anime/watch";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image as LucideImage, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { IAnimeInfo } from "@consumet/extensions/dist/models";

const DetailsContainer: React.FC<{ data: IAnimeInfo }> = ({ data }) => {
  return (
    <>
      <div className="">
        <div className="mx-auto max-w-6xl md:pt-4">
          <div className="h-[30dvh] w-full overflow-hidden border bg-muted shadow md:rounded-lg lg:h-[55dvh]">
            <div
              style={{
                backgroundImage: `url('${data.cover}')`,
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
                <div
                  className={cn(
                    "relative flex aspect-poster w-full items-center justify-center overflow-hidden rounded-lg border bg-muted text-muted shadow"
                  )}
                >
                  {data.image ? (
                    <Image
                      fill
                      className="object-fill"
                      loading="lazy"
                      sizes="100%"
                      alt={
                        typeof data.title === "string"
                          ? data.title
                          : data.title.english ||
                            data.title.userPreferred ||
                            data.title.romaji ||
                            data.title.native ||
                            ""
                      }
                      src={data.image}
                    />
                  ) : (
                    <LucideImage size={24} />
                  )}
                </div>
              </aside>

              <article className="flex w-full flex-col gap-2 md:w-2/3">
                {data.releaseDate && (
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(data.releaseDate), "PPP", {})}
                  </span>
                )}

                <h1 className="text-lg font-bold md:text-4xl">
                  {typeof data.title === "string"
                    ? data.title
                    : data.title.english ||
                      data.title.userPreferred ||
                      data.title.romaji ||
                      data.title.native ||
                      ""}
                </h1>

                <div className="flex flex-wrap items-center gap-2">
                  {data.genres && (
                    <>
                      {data.genres.map((genre: any) => {
                        return (
                          <Link
                            key={genre}
                            href={`/anime/genre/${genre
                              .toLowerCase()
                              .replace(/ /g, "-")}`}
                          >
                            <Badge
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              {genre}
                            </Badge>
                          </Link>
                        );
                      })}

                      <Separator orientation="vertical" className="h-6" />
                    </>
                  )}

                  <Badge variant="default" className="whitespace-nowrap">
                    {data.status}
                  </Badge>
                  <Separator orientation="vertical" className="h-6" />
                  <Badge variant="secondary" className="whitespace-nowrap">
                    {data.totalEpisodes}
                  </Badge>
                </div>

                <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">
                  {data.description}
                </p>
              </article>
            </main>

            <Tabs defaultValue="watch">
              <div className="scrollbar-hide">
                <TabsList>
                  <TabsTrigger value="watch">Watch</TabsTrigger>
                  <TabsTrigger value="characters">Characters</TabsTrigger>
                  <TabsTrigger value="relations">Relations</TabsTrigger>
                  <TabsTrigger value="recommendations">
                    Recommendations
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="watch" className="mt-4">
                <Watch id={data.id} />
              </TabsContent>

              <TabsContent value="characters" className="mt-4">
                <div className="mt-2 items-center grid grid-  cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
                  {data.characters &&
                    data.characters.map((item: any, index: any) => (
                      <div key={index}>
                        <Card className="text-center items-center hover:scale-105 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="text-xs h-6 truncate">
                              {item.name.full} ({item.role})
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Image
                              src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
                              width={140}
                              height={200}
                              className="rounded-md"
                              alt="Character Poster"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    ))}{" "}
                </div>
              </TabsContent>

              <TabsContent value="relations" className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                    {data.relations &&
                      data.relations.map((item: any, index: any) => (
                        <div key={index}>
                          <Link
                            href={
                              item.type == "MOVIE"
                                ? `/anime/${item.id}`
                                : item.type == "MANGA"
                                ? `/manga/${item.id}`
                                : item.type == "TV"
                                ? `/anime/${item.id}`
                                : ``
                            }
                          >
                            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
                              {item.cover ? (
                                <Image
                                  fill
                                  className="object-cover"
                                  src={`${item.cover}`}
                                  alt={
                                    item.title["english"] ||
                                    item.title["romaji"]
                                  }
                                  sizes="100%"
                                />
                              ) : (
                                <ImageIcon className="text-muted" />
                              )}
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-start justify-between gap-2 pt-1">
                                <span className="trucate line-clamp-1 pt-1">
                                  {item.title["english"] ||
                                    item.title["romaji"]}
                                </span>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Badge variant="outline">
                                        {item.relationType}
                                      </Badge>
                                    </TooltipTrigger>

                                    <TooltipContent>
                                      <p>{item.status}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>

                              <p className="line-clamp-3 text-xs text-muted-foreground">
                                {item.type}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}{" "}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                    {data.recommendations &&
                      data.recommendations.map((item: any, index: any) => (
                        <div key={index}>
                          <Link
                            href={
                              item.type == "MOVIE"
                                ? `/anime/${item.id}`
                                : item.type == "MANGA"
                                ? `/manga/${item.id}`
                                : item.type == "TV"
                                ? `/anime/${item.id}`
                                : ``
                            }
                          >
                            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
                              {item.cover ? (
                                <Image
                                  fill
                                  className="object-cover"
                                  src={`${item.cover}`}
                                  alt={
                                    item.title["english"] ||
                                    item.title["romaji"]
                                  }
                                  sizes="100%"
                                />
                              ) : (
                                <ImageIcon className="text-muted" />
                              )}
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-start justify-between gap-2 pt-1">
                                <span className="trucate line-clamp-1 pt-1">
                                  {item.title["english"] ||
                                    item.title["romaji"]}
                                </span>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Badge variant="outline">
                                        {item.rating / 10}
                                      </Badge>
                                    </TooltipTrigger>

                                    <TooltipContent>
                                      <p>{item.status}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>

                              <p className="line-clamp-3 text-xs text-muted-foreground">
                                {item.type}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}{" "}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsContainer;