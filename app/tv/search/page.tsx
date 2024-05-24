"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Tv_Search } from "@/config/url";
import { FetchMovieInfo } from "@/lib/fetch";
import Image from "next/image";
import Link from "next/link";

export default function Search() {
  const [title, setTitle] = useState("");
  const [result, setResults] = useState<any>(null);

  const fetch_results = async (title: any) => {
    const data = await get_search_results(title);
    FetchMovieInfo(data);
    setResults(data);
  };

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <FaSearch color="current" size={17} />
        <input
          placeholder="Search for tv shows"
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          )}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={async (e) => {
            if ((e.key === "Enter" || e.code === "Enter") && title) {
              await fetch_results(title.toString());
            }
          }}
        />
      </div>

      <section>
        <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {result &&
            result.results &&
            result.results.map((item: any, index: any) => {
              if (item.poster_path) {
                return (
                  <Link
                    href={`/tv/${encodeURIComponent(item.id)}`}
                    key={index}
                  >
                    <Card className="text-center items-center hover:scale-105 transition-all duration-300 hover:shadow-md dark:hover:shadow-blue-700 hover:shadow-zinc-900">
                      <CardHeader>
                        <CardTitle className="text-xs">
                          {item.name || `" "`}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Image
                          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                          width={160}
                          height={160}
                          className="h-2/4 w-full object-cover transition-all aspect-[3/4] rounded-md"
                          alt="Drama Poster"
                        />
                      </CardContent>
                    </Card>
                  </Link>
                );
              }
            })}
        </div>
      </section>
    </main>
  );
}
const get_search_results = async (title: any) => {
  const res = await fetch(Tv_Search + title, {
    next: { revalidate: 21600 },
  });
  const data = await res.json();
  return data;
};
