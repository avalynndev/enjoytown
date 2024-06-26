"use client";
import { cn } from "@/lib/utils";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import { Icons } from "@/components/common/icons";
import { GetSearchedAnime, PreFetchMangaInfo } from "@/lib/fetch";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [title, setTitle] = useState("");
  const [data, setInfoTitle] = useState<any[]>([]);
  const [loadingText, setLoading] = useState<boolean>(false);

  const handleSearch = async (title: string) => {
    if (title) {
      setLoading(true);
      const data = await GetSearchedAnime(title);
      PreFetchMangaInfo(data);
      setLoading(false);
      setInfoTitle(data.results);
    }
  };

  // Debounce function to limit the rate of API calls
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: void, ...args: any[]) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  // Effect to trigger search when title changes
  useEffect(() => {
    if (title) {
      debouncedSearch(title);
    }
  }, [title, debouncedSearch]);
  return (
    <div className="container gap-6 pb-8 pt-6 md:py-10 flex items-center flex-col text-center">
      <GlowingStarsBackgroundCard />
      <div className="flex  flex-col  max-w-6xl w-full px-4 mx-auto  justify-center  items-center ">
        <div className="flex justify-end flex-col">
          <h2 className="mb-10  text-2xl text-center sm:text-4xl font-bold  ">
            Search for mangas..
          </h2>
        </div>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <input
          placeholder="Search for mangas"
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          )}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Button
          onClick={async () => {
            if (title) {
              await handleSearch(title);
            }
          }}
          variant="ghost"
          size="icon"
        >
          <Icons.search className="h-6 w-6" />
        </Button>
      </div>

      {loadingText && (
        <div className="w-full gap-x-2 flex justify-center items-center">
          <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full"></div>
          <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full"></div>
          <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full"></div>
        </div>
      )}
      <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data &&
          data.map((item: any, index: any) => {
            return (
              <Link
                shallow
                href={`/manga/info/${item.id}`}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <Card className="text-center items-center hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xs h-6 truncate">
                      {item.title["english"] || item.title["romaji"]}
                    </CardTitle>
                    <div className="flex-col space-x-4 space-y-2">
                      <span className="right-0 px-2 py-1 bg-foreground text-background rounded-xl text-sm">
                        Vol:{" "}
                        {item.volumes !== undefined && item.volumes !== null
                          ? item.volumes
                          : "?"}
                      </span>
                      <span className="left-0 px-2 py-1 bg-foreground text-background rounded-xl text-sm">
                        Ch:{" "}
                        {item.totalChapters !== undefined &&
                        item.totalChapters !== null
                          ? item.totalChapters
                          : "?"}
                      </span>
                    </div>
                    <span className="bottom-3 left-8 right-8 px-7 py-1 bg-foreground text-background rounded-xl text-sm">
                      {item.status !== undefined && item.status !== null
                        ? item.status
                        : "?"}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <Image
                      className="h-2/4 w-full object-cover rounded-xl transition-all aspect-[3/4]"
                      src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
                      width={160}
                      height={160}
                      alt="Manga Poster"
                    />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
