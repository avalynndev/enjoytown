import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { PreFetchChaterLinks, getMangaInfo } from '@/lib/consumet';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function MangaInfo({ params }: any) {
  const id = params.id;
  const data = await getMangaInfo(id);

  if (data.message) {
    redirect('/404');
  }

  let description;
  if (!data.description) {
    description = 'Sorry but description for this particular manga was not found.';
  } else {
    description = data.description.split('<br>')[0];
  }


  return (
    <div>
      {data && (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl lg:flex">
            <div className="pr-5 pb-10">
              <div
                className="overflow-hidden rounded-lg bg-white shadow-md"
                style={{ width: '250px' }}
              >
                <div className="relative h-96">
                  <Image
                    src={`${data.image}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Manga Cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
            <div className="pr-4">
              <h1 className="text-3xl font-semibold">
                {data.title['english'] || data.title['romaji']}
              </h1>
              <div className="mt-2 gap-2">
                <strong>Rating: </strong>
                {data.rating / 10}
              </div>
              <div className="mt-2 gap-2">
                <strong>Genres: </strong>
                <div className="mt-2 flex gap-2">
                  {data.genres &&
                    data.genres.map((item: any, index: any) => (
                      <Button size="sm" key={index}>
                        {item}
                      </Button>
                    ))}
                </div>
              </div>
              <p className="mt-2">
                <strong> Started on:</strong> {data.startDate['day']}-{data.startDate['month']}-
                {data.startDate['year']}
              </p>
              <p className="mt-2">
                <strong> Ended on:</strong> {data.endDate['day']}-{data.endDate['month']}-
                {data.endDate['year']}
              </p>
              <p className="mt-2">
                <strong>Description:</strong> {description}
              </p>
            </div>
          </div>
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mt-2 grid grid-cols-2 items-center gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6">
                {data.characters &&
                  data.characters.map((item: any, index: any) => (
                    <div key={index}>
                      <Card className="items-center text-center transition-all duration-300 hover:scale-105">
                        <CardHeader>
                          <CardTitle className="h-6 truncate text-xs">
                            {item.name.full} ({item.role})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Image
                            src={`${item.image}`}
                            width={140}
                            height={200}
                            className="rounded-md"
                            alt="Character Poster"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 pt-6">
                {data.chapters &&
                  data.chapters.map((item: any, index: any) => {
                    if (item.pages !== 0) {
                      return (
                        <Link
                          key={index}
                          href={{
                            pathname: `/manga/read/${id}/${item.id}`,
                          }}
                        >
                          <Button key={index}>
                            Vol: {item.volumeNumber} Ch: {item.chapterNumber}
                          </Button>
                        </Link>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}