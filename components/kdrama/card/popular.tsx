import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { FetchAnimeInfo } from "@/lib/fetch";

export default async function Popular() {
  const popular = await getPopular();
  FetchAnimeInfo(popular);

  return (
    <div className="container grid items-center gap-6">
      <div className="text-center max-w mx-auto px-6">
        <div className="grid w-full grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {popular &&
            popular.results.slice(0, 18).map((item: any, index: any) => (
              <Link
                href={`/kdrama/${encodeURIComponent(item.id)}`}
                key={index}
                className="w-[150px] cursor-pointer space-y-2"
                data-testid="movie-card"
              >
                <div>
                  {item.image ? (
                    <Image
                      width={160}
                      height={160}
                      className="h-[230px] w-[270px] h-2/4 flex items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow"
                      src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
                      alt={item.title}
                    />
                  ) : (
                    <ImageIcon className="text-muted" />
                  )}
                </div>
                <div className="">
                  <div className="flex items-start justify-between gap-1">
                    <span className="truncate">{item.title}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

async function getPopular() {
  const res = await fetch("https://dramacool-scraper.vercel.app/popular", {
    next: { revalidate: 21600 },
  });
  const data = await res.json();
  return data;
}
