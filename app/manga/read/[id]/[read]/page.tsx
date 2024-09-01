"use client";
import Image from "next/image";
import { PreFetchChaterLinks, fetchManga } from "@/fetch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { env } from "@/env.mjs";

export default function Read({ params }: any) {
  const chapterId = params.read;
  const [results, setResults] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);
  const navigate = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const fetchedResults = await fetchManga(chapterId);
      const id = params.id;
      const fetchedData = await getMangaInfo(id);

      PreFetchChaterLinks(fetchedData.chapters);

      if (fetchedResults && fetchedResults.chapter) {
        const image_base_url =
          fetchedResults.baseUrl + "/data/" + fetchedResults.chapter.hash;
        const fetchedImages = fetchedResults.chapter.data.map((img: string) => {
          return image_base_url + "/" + img;
        });

        setResults(fetchedResults);
        setData(fetchedData);
        setImages(fetchedImages);
      } else {
        console.error(
          "Error: fetchedResults or fetchedResults.chapter is undefined"
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [chapterId, params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleChapterMenu = () => {
    setIsChapterMenuOpen(!isChapterMenuOpen);
  };

  const navigateChapter = (direction: "prev" | "next") => {
    const currentIndex = data.chapters.findIndex(
      (chapter: any) => chapter.id === chapterId
    );
    let newChapter;
    if (direction === "prev" && currentIndex > 0) {
      newChapter = data.chapters[currentIndex - 1];
    } else if (
      direction === "next" &&
      currentIndex < data.chapters.length - 1
    ) {
      newChapter = data.chapters[currentIndex + 1];
    }
    if (newChapter) {
      navigate.push(`/manga/read/${params.id}/${newChapter.id}`);
    }
  };

  if (!results || !data || images.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-center h-screen">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <Spinner size="large">Loading...</Spinner>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex">
      <Button onClick={toggleChapterMenu} className="fixed top-20 left-4 z-50">
        {isChapterMenuOpen ? "✖" : "VOL"}
      </Button>
      <aside
        id="sidebar"
        className={`fixed left-0 top-0 z-40 h-screen w-48 transition-transform bg-background ${
          isChapterMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto border-slate-200 px-3 py-4">
          <div className="space-y-2 text-sm font-medium">
            <div className="pt-32">
              <h3 className="ml-3 flex-1 text-3xl whitespace-nowrap font-mono">
                CHAPTERS
              </h3>
              <ScrollArea className="h-[40rem] max-w-48 rounded-md border">
                <div className="gap-2 flex-col items-center px-2 py-2">
                  {data.chapters &&
                    data.chapters.map((item: any, index: any) => {
                      if (item.pages !== 0) {
                        return (
                          <div className="py-1" key={index}>
                            <Link
                              href={{
                                pathname: `/manga/read/${params.id}/${item.id}`,
                              }}
                            >
                              <Button
                                key={index}
                                className="pt-1 pb-1 h-full w-full"
                              >
                                Vol: {item.volumeNumber} Ch:{" "}
                                {item.chapterNumber}
                              </Button>
                            </Link>{" "}
                          </div>
                        );
                      }
                    })}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 items-center justify-center flex flex-col">
        <div className="flex items-center mb-4 mt-8 space-x-6 ">
          <Button
            onClick={() => navigateChapter("prev")}
            disabled={
              data.chapters.findIndex(
                (chapter: any) => chapter.id === chapterId
              ) <= 0
            }
            className="border border-black px-4 py-2 flex items-center"
          >
            &larr; Prev Ch
          </Button>
          <Link href={`https://mangadex-downloader.onrender.com/${chapterId}`}>
            <Button variant="ringHover">Download</Button>
          </Link>
          <Button
            onClick={() => navigateChapter("next")}
            disabled={
              data.chapters.findIndex(
                (chapter: any) => chapter.id === chapterId
              ) >=
              data.chapters.length - 1
            }
            className="border border-black px-4 py-2 flex items-center"
          >
            Next Ch &rarr;
          </Button>
        </div>
        {images &&
          images.map((item, index) => (
            <div key={index}>
              <Image
                src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item}&headers=https://mangadex.org`}
                key={index}
                alt="Pages"
                width={800}
                height={1000}
                priority
                quality={100}
                unoptimized
              />
            </div>
          ))}
        <div className="flex items-center mb-4 mt-8 space-x-6 ">
          <Button
            onClick={() => navigateChapter("prev")}
            disabled={
              data.chapters.findIndex(
                (chapter: any) => chapter.id === chapterId
              ) <= 0
            }
            className="border border-black px-4 py-2 flex items-center"
          >
            &larr; Prev Ch
          </Button>
          <Button
            onClick={() => navigateChapter("next")}
            disabled={
              data.chapters.findIndex(
                (chapter: any) => chapter.id === chapterId
              ) >=
              data.chapters.length - 1
            }
            className="border border-black px-4 py-2 flex items-center"
          >
            Next Ch &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}

async function getMangaInfo(id: any) {
  const res = await fetch(
    `${env.CONSUMET_API_URL}/meta/anilist-manga/info/${id}?provider=mangadex`,
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
}
