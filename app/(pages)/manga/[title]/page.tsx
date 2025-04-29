import Image from 'next/image';
import Link from 'next/link';
import { PreFetchMangaInfo, GetSearchedAnime } from '@/lib/consumet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function MangaInfo({ params }: any) {
  const title = await params.title;
  const data = await GetSearchedAnime(title);

  PreFetchMangaInfo(data);

  return (
    <div className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      {title && (
        <div>
          <p>Searched for: {decodeURIComponent(title)}</p>
        </div>
      )}
      <div className="mt-2 grid grid-cols-2 items-center gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6">
        {data &&
          data.results.map(async (item: any, index: any) => {
            return (
              <Link
                shallow
                href={`./info/${item.id}`}
                style={{ textDecoration: 'none' }}
                key={index}
              >
                <Card className="items-center text-center transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="h-6 truncate text-xs">
                      {item.title['english'] || item.title['romaji']}
                    </CardTitle>
                    <div className="flex-col space-y-2 space-x-4">
                      <span className="bg-foreground text-background right-0 rounded-xl px-2 py-1 text-sm">
                        Vol:{' '}
                        {item.volumes !== undefined && item.volumes !== null ? item.volumes : '?'}
                      </span>
                      <span className="bg-foreground text-background left-0 rounded-xl px-2 py-1 text-sm">
                        Ch:{' '}
                        {item.totalChapters !== undefined && item.totalChapters !== null
                          ? item.totalChapters
                          : '?'}
                      </span>
                    </div>
                    <span className="bg-foreground text-background right-8 bottom-3 left-8 rounded-xl px-7 py-1 text-sm">
                      {item.status !== undefined && item.status !== null ? item.status : '?'}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <Image
                      className="aspect-[3/4] h-2/4 w-full rounded-xl object-cover transition-all"
                      src={`${item.image}`}
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

