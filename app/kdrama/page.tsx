"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import { Icons } from "@/components/common/icons";
import { FetchSearchTitle, FetchAnimeInfo } from "@/lib/fetch";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DramaSearch() {
  const [title, setTitle] = useState("");
  const [data, setInfoTitle] = useState<any[]>([]);
  const [loadingText, setLoading] = useState<boolean>(false);

  const handleSearch = async (title: string) => {
    if (title) {
      setLoading(true);
      const data = await FetchSearchTitle(title);
      FetchAnimeInfo(data);
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
      <div className="my-8 mx-auto max-w-7xl h-[40vh] overflow-hidden border rounded-lg md:rounded-xl">
        <img
          className="h-full not-prose w-full object-cover object-bottom"
          src={
            "https://pooledink.com/wp-content/uploads/2022/04/kdrama-banner.png?w=920"
          }
          width={920}
          height={80}
          alt="hero image"
        />
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <input
          placeholder="Search for drama"
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
          data.map((item, index) => (
            <Link href={`/kdrama/${encodeURIComponent(item.id)}`} key={index}>
              <Card className="text-center items-center hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xs">
                    {item.title.length > 24
                      ? item.title.slice(0, 20) + "..."
                      : item.title.replace(/\s*\((\d{4})\)$/, "")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
                    width={160}
                    height={160}
                    className="h-2/4 w-full object-cover transition-all aspect-[3/4] rounded-md"
                    alt="Drama Poster"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
