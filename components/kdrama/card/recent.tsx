import Image from "next/image";
import Link from "next/link";
import { FetchAnimeInfo } from "@/lib/fetch";
import { Image as ImageIcon } from "lucide-react";

export default async function RecentDramas() {
  const recent = await getRecent();
  FetchAnimeInfo(recent);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
          {recent &&
            recent.results.slice(0, 18).map((item: any, index: any) => (
              <Link
                href={`/kdrama/${encodeURIComponent(item.id)}`}
                key={index}
                className="w-full cursor-pointer space-y-2"
                data-testid="movie-card"
              >
                <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
                  {item.image ? (
                    <Image
                      fill
                      className="object-cover"
                      src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
                      alt={item.title}
                      sizes="100%"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top"
                    />
                  ) : (
                    <ImageIcon className="text-muted" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <span className="">{item.title}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

async function getRecent() {
  const res = await fetch("https://dramacool-scraper.vercel.app/recent", {
    next: { revalidate: 21600 },
  });
  const data = await res.json();
  return data;
}
