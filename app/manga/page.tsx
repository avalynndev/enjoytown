"use client";
import { cn } from "@/lib/utils";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import { Icons } from "@/components/common/icons";
import { GetSearchedAnime, PreFetchMangaInfo } from "@/fetch";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const placeholders = [
    "Naruto (2002-2007)",
    "Attack on Titan (2013-2023)",
    "Death Note (2006-2007)",
    "Demon Slayer: Kimetsu no Yaiba (2019-present)",
    "My Hero Academia (2016-present)",
    "Fullmetal Alchemist: Brotherhood (2009-2010)",
    "Attack on Titan: The Final Season (2020-2023)",
    "Jujutsu Kaisen (2020-present)",
    "Sword Art Online (2012-2017)",
    "Black Clover (2017-present)",
    "One Piece (1999-present)",
    "Haikyuu!! (2014-2020)",
    "Blue Exorcist (2011-2016)",
    "Sword Art Online: Alicization (2018-2019)",
    "The Rising of the Shield Hero (2019-present)"
  ];
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  // Effect to trigger search when title changes
  useEffect(() => {
    if (title) {
      debouncedSearch(title);
    }
  }, [title, debouncedSearch]);
  return (
    <>
      <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Ask Aceternity UI Anything
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(event) => setTitle(event.target.value)}
          onSubmit={onSubmit}
        />
      </div>
      <div className="container gap-6 pb-8 md:py-10 flex items-center flex-col text-center">

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
    </>
  );
}
