import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { PreFetchChaterLinks } from "@/fetch";
import Link from "next/link";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function MangaInfo({ params }: any) {
  const id = params.id;
  const data = await getMangaInfo(id);

  if (data.message) {
    redirect("/404");
  }

  let description;
  if (!data.description) {
    description =
      "Sorry but description for this particular manga was not found.";
  } else {
    description = data.description.split("<br>")[0];
  }

  PreFetchChaterLinks(data.chapters);
  const embed = false;

  return (
    <div>
      <div className="">
        <div className={cn("mx-auto max-w-6xl", embed ? "p-0" : "md:pt-4")}>
          <div
            className={cn(
              `h-[30dvh] w-full overflow-hidden border bg-muted shadow md:rounded-lg lg:h-[55dvh]`,
              embed ? "max-h-[20vh] md:max-h-[50vh]" : undefined
            )}
          >
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
                      alt={data.title["english"] || data.title["romaji"]}
                      src={data.image}
                    />
                  ) : (
                    <ImageIcon size={24} />
                  )}
                </div>
              </aside>

              <article className="flex w-full flex-col gap-2 md:w-2/3">
                <span className="text-xs text-muted-foreground">
                  {data.startDate["day"]} of {data.startDate["month"]} month in{" "}
                  {}
                  {data.startDate["year"]} -- {data.endDate["day"]} of{" "}
                  {data.endDate["month"]} month in {}
                  {data.endDate["year"]}
                </span>

                <h1 className="text-lg font-bold md:text-4xl">
                  {data.title["english"] || data.title["romaji"]}
                </h1>

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
                            {genre}
                          </Badge>
                        );
                      })}

                      <Separator orientation="vertical" className="h-6" />
                    </>
                  )}

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge>{data.rating / 10}</Badge>
                      </TooltipTrigger>

                      <TooltipContent>
                        <p>{data.popularity}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">
                  {description}
                </p>
              </article>
            </main>

            <Tabs defaultValue="read">
              <div className="scrollbar-hide">
                <TabsList>
                  <TabsTrigger value="read">Read</TabsTrigger>
                  <TabsTrigger value="characters">Characters</TabsTrigger>
                  <TabsTrigger value="relations">Relations</TabsTrigger>
                  <TabsTrigger value="recommendations">
                    Recommendations
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="read" className="mt-4">
                <div className="py-8 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto ">
                    <div className="flex flex-wrap gap-2 items-center pt-6">
                      {data.chapters &&
                        data.chapters.map((item: any, index: any) => {
                          if (item.pages !== 0) {
                            return (
                              <Link
                                key={index}
                                href={{
                                  pathname: `/manga/read/${id}/${item.id}`,
                                }}
                              >
                                <Button key={index}>
                                  Vol: {item.volumeNumber} Ch:{" "}
                                  {item.chapterNumber}
                                </Button>
                              </Link>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="characters" className="mt-4">
                <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
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
                                ? `/manga/info/${item.id}`
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
                                ? `/manga/info/${item.id}`
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
    </div>
  );
}

async function getMangaInfo(id: any) {
  const res = await fetch(
    `https://consumet-jade.vercel.app/meta/anilist-manga/info/${id}?provider=mangadex`,
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
}
