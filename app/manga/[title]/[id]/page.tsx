import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { PreFetchChaterLinks } from "@/lib/fetch";
import Link from "next/link";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function MangaInfo({ params }: any) {
  const id = params.id;
  const data = await getMangaInfo(id);

  if (data.message) {
    redirect("/404");
  }

  let description;
  if (!data.description) {
    description =
      "Sorry but description for this particular manga was not found.";
  } else {
    description = data.description.split("<br>")[0];
  }

  PreFetchChaterLinks(data.chapters);

  return (
    <div>
      {data && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto lg:flex">
              <div className="pb-10 pr-5">
                <div
                  className="rounded-lg overflow-hidden bg-white shadow-md"
                  style={{ width: "250px" }}
                >
                  <div className="relative h-96">
                    <Image
                      src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${data.image}`}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt="Manga Cover"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
              <div className=" pr-4">
                <h1 className="text-3xl font-semibold">
                  {data.title["english"] || data.title["romaji"]}
                </h1>
                <div className="mt-2 gap-2">
                  <strong>Rating: </strong>
                  {data.rating / 10}
                </div>
                <div className="mt-2 gap-2">
                  <strong>Genres: </strong>
                  <div className="mt-2 gap-2 flex">
                    {data.genres &&
                      data.genres.map((item: any, index: any) => (
                        <Button size="sm" key={index}>{item}</Button>
                      ))}
                  </div>
                </div>
                <p className="mt-2">
                  <strong> Started on:</strong> {data.startDate["day"]}-
                  {data.startDate["month"]}-{data.startDate["year"]}
                </p>
                <p className="mt-2">
                  <strong> Ended on:</strong> {data.endDate["day"]}-
                  {data.endDate["month"]}-{data.endDate["year"]}
                </p>
                <p className="mt-2">
                  <strong>Description:</strong> {description}
                </p>
              </div>
            </div>
            <div className="py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto ">
                <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
                  {data.characters &&
                    data.characters.map((item: any, index: any) => (
                      <div key={index}>
                        <Card className="text-center items-center hover:scale-105 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="text-xs h-6 truncate">
                              {item.name.full} ({item.role})
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Image
                              src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.image}`}
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
            <div className="py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto ">
                <div className="flex flex-wrap gap-2 items-center pt-6">
                  {data.chapters &&
                    data.chapters.map((item: any, index: any) => {
                      if (item.pages !== 0) {
                        return (
                          <Link
                            key={index}
                            href={{
                              pathname: `/manga/read/${item.id}`,
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

async function getMangaInfo(id: any) {
  const res = await fetch(
    `https://consumet-jade.vercel.app/meta/anilist-manga/info/${id}?provider=mangadex`,
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
}
