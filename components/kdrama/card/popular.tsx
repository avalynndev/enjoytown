import Image from "next/image";
import Link from "next/link";
import { FetchAnimeInfo } from "@/lib/fetch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Popular() {
  const popular = await getPopular();
  FetchAnimeInfo(popular);

  return (
    <div>
      <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {popular &&
          popular.results.slice(0, 24).map((item: any, index: any) => (
            <Link href={`/kdrama/info/${encodeURIComponent(item.id)}`} key={index}>
              <Card className="text-center items-center hover:scale-105 transition-all duration-300 hover:shadow-md dark:hover:shadow-blue-700 hover:shadow-zinc-900">
                <CardHeader>
                  <CardTitle className="text-xs h-6">
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

async function getPopular() {
  const res = await fetch("https://dramacool-scraper.vercel.app/popular", {
    next: { revalidate: 21600 },
  });
  const data = await res.json();
  return data;
}
