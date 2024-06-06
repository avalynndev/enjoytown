"use client";
import { cn } from "@/lib/utils";
import { FaSearch } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { FetchSearchTitle } from "@/lib/fetch";
import Image from "next/image";
import Link from "next/link";
import { FetchAnimeInfo } from "@/lib/fetch";
import { Button } from "@/components/ui/button";

export default function DramaSearch() {
  const [title, setTitle] = useState("");
  const [infoTitle, setInfoTitle] = useState<any[]>([]);
  const [loadingText, setLoading] = useState<boolean>();

  const handleSearch = async (title: any) => {
    setLoading(true);
    const data = await FetchSearchTitle(title);
    FetchAnimeInfo(data);
    setLoading(false);
    setInfoTitle(data.results);
  };

  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <FaSearch color="current" size={17} />
        <input
          placeholder="Search for drama"
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          )}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={async (e) => {
            if ((e.key === "Enter" || e.code === "Enter") && title) {
              await handleSearch(title.toString());
            }
          }}
        />
        <Button
          onClick={async () => {
            if (title) {
              await handleSearch(title.toString());
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
          <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
          <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
          <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
        </div>
      )}

      <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {infoTitle != null &&
          infoTitle.map((item, index) => (
            <Link
              href={`/kdrama/info/${encodeURIComponent(item.id)}`}
              key={index}
            >
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
