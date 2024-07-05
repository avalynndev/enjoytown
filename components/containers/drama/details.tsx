import { format } from "date-fns";
import Image from "next/image";
import { Image as LucideImage } from "lucide-react";
import { cn } from "@/lib/utils";
import EpisodeContainer from "@/components/containers/drama/episode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const DetailsContainer = ({ data, id, embed }: any) => {
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
              backgroundImage: `url('')`,
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
                    alt={data.title}
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

              <h1 className="text-lg font-bold md:text-4xl">{data.title}</h1>

              <div className="flex flex-wrap items-center gap-2">
                {data.genres.length > 0 && (
                  <>
                    {data.genres.map((genre: any) => {
                      return (
                        <Badge
                          key={genre}
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

                <Badge variant="default" className="whitespace-nowrap">
                  {data.status}
                </Badge>
              </div>

              <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">
                {data.description}
              </p>

              {/**<div className="flex flex-wrap items-center gap-1">
                Watch Providers
              </div>/ */}
            </article>
          </main>

          <EpisodeContainer data={data.episodes} id={id} />
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
