import Image from "next/image";
import Link from "next/link";
import { PreFetchMangaInfo } from "@/lib/fetch";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function MangaInfo({ params }: any) {
  const title = params.title;
  const data = await GetSearchedAnime(title);

  PreFetchMangaInfo(data);

  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        {title && (
          <div>
            <p>Searched for: {decodeURIComponent(title)}</p>
          </div>
        )}
        <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data &&
            data.results.map(async (item: any, index: any) => {
              return (
                <Link
                  shallow
                  href={`./info/${item.id}`}
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

async function GetSearchedAnime(title: any) {
  const res = await fetch(
    "https://consumet-jade.vercel.app/meta/anilist-manga/" + title
  );
  const data = await res.json();
  return data;
}
