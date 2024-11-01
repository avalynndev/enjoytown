"use client";
import { IAnimeResult } from "@consumet/extensions/dist/models/types";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Image as ImageIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PROXY } from "@/config/url";

type AnimeFeatureType = "recent" | "popular" | "trending";

type AnimeFeatureProps = {
  featureType: AnimeFeatureType;
};

export default function FeaturedAnime({ featureType }: AnimeFeatureProps) {
  const [data, setData] = React.useState<IAnimeResult[] | null>(null);
  const [loading, setLoading] = React.useState(true);

  const anilist = React.useMemo(() => new Anilist(new Gogoanime()), []);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let res;
      switch (featureType) {
        case "recent":
          res = await anilist.fetchRecentEpisodes();
          break;
        case "popular":
          res = await anilist.fetchPopularAnime(1, 20);
          break;
        case "trending":
          res = await anilist.fetchTrendingAnime(1, 20);
          break;
      }

      setData(res.results);
      setLoading(false);
    };

    fetchData();
  }, [anilist, featureType]);

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
              data.map((item, index) => (
                <Link
                  href={`/anime/${encodeURIComponent(item.id)}`}
                  key={index}
                  className="w-full cursor-pointer space-y-2"
                  data-testid="movie-card"
                >
                  <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
                    {item.image ? (
                      <Image
                        fill
                        className="object-cover"
                        src={`${PROXY}${item.image}`}
                        alt={
                          typeof item.title === "string"
                            ? item.title
                            : item.title.english ||
                              item.title.userPreferred ||
                              item.title.romaji ||
                              item.title.native ||
                              ""
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
                          {typeof item.title === "string"
                            ? item.title
                            : item.title.english ||
                              item.title.userPreferred ||
                              item.title.romaji ||
                              item.title.native ||
                              ""}
                        </span>
                      </div>
                      <div className="justify-end flex items-center gap-2">
                        {item.rating && (
                          <Badge variant="outline">
                            {item.rating ? item.rating / 10 : "?"}
                          </Badge>
                        )}
                        <Separator orientation="vertical" className="h-6" />
                        <Badge variant="secondary">
                          {item.episodeNumber
                            ? item.episodeNumber
                            : item.totalEpisodes ?? "?"}
                        </Badge>
                      </div>
                    </div>

                    <p className="line-clamp-3 text-xs text-muted-foreground">
                      {/* Recent only includes ep. title and others only have description */}
                      {item.episodeTitle}
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
