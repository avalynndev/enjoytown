'use client';

import Image from "next/image";
import { PreFetchChaterLinks } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

function Read({ params }: any) {
  const chapterId = params.read;
  const [results, setResults] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);

  const fetchData = async () => {
    const fetchedResults = await getPages(chapterId);

    if (fetchedResults && fetchedResults.chapter) {
      const image_base_url = fetchedResults.baseUrl + "/data/" + fetchedResults.chapter.hash;
      const id = params.id;
      const fetchedData = await getMangaInfo(id);

      PreFetchChaterLinks(fetchedData.chapters);

      if (fetchedResults.length === 0) {
        return;
      }

      const fetchedImages = fetchedResults.chapter.data.map((img: string) => {
        return image_base_url + "/" + img;
      });

      setResults(fetchedResults);
      setData(fetchedData);
      setImages(fetchedImages);
    } else {
      console.error("Error: fetchedResults or fetchedResults.chapter is undefined");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    if (currentPageIndex < images.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const toggleChapterMenu = () => {
    setIsChapterMenuOpen(!isChapterMenuOpen);
  };

  const navigateChapter = (direction: 'prev' | 'next') => {
    const currentIndex = data.chapters.findIndex((chapter: any) => chapter.id === chapterId);
    let newChapter;
    if (direction === 'prev' && currentIndex > 0) {
      newChapter = data.chapters[currentIndex - 1];
    } else if (direction === 'next' && currentIndex < data.chapters.length - 1) {
      newChapter = data.chapters[currentIndex + 1];
    }
    if (newChapter) {
      window.location.href = `/manga/read/${params.id}/${newChapter.id}`;
    }
  };

  if (!results || !data || images.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative flex">
      <Button onClick={toggleChapterMenu} className="fixed top-14 left-4 z-50">
        {isChapterMenuOpen ? '✖' : 'VOL'}
      </Button>
      <aside
        id="sidebar"
        className={`fixed left-0 top-0 z-40 h-screen w-48 transition-transform bg-background ${
          isChapterMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto border-slate-200 px-3 py-4">
          <div className="space-y-2 text-sm font-medium">
            <div className="pt-20">
              <h3 className="ml-3 flex-1 text-3xl whitespace-nowrap font-mono">
                CHAPTERS
              </h3>
              <div className="gap-2 pt-4 flex-col items-center">
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
                              Vol: {item.volumeNumber} Ch: {item.chapterNumber}
                            </Button>
                          </Link>{" "}
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 items-center justify-center flex flex-col">
        <div className="flex items-center mb-4">
          <Button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="text-white bg-black px-4 py-2 flex items-center mr-2"
          >
            &larr; Prev
          </Button>
          <span className="text-lg font-bold">{currentPageIndex + 1}</span>
          <span className="mx-2">/</span>
          <span className="text-lg font-bold">{images.length}</span>
          <Button
            onClick={handleNextPage}
            disabled={currentPageIndex === images.length - 1}
            className="text-white bg-black px-4 py-2 flex items-center ml-2"
          >
            Next &rarr;
          </Button>
        </div>
        <div key={currentPageIndex}>
          <Image
            src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${images[currentPageIndex]}&headers=https://mangadex.org`}
            alt="Pages"
            width={800}
            height={1000}
            priority
            quality={100}
            unoptimized
          />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-4 mb-4">
          <Button
            onClick={() => navigateChapter('prev')}
            disabled={data.chapters.findIndex((chapter: any) => chapter.id === chapterId) <= 0}
            className="text-black bg-transparent border border-black px-4 py-2 flex items-center"
          >
            &larr; Prev Ch
          </Button>
          <Button
            onClick={() => navigateChapter('next')}
            disabled={data.chapters.findIndex((chapter: any) => chapter.id === chapterId) >= data.chapters.length - 1}
            className="text-black bg-transparent border border-black px-4 py-2 flex items-center"
          >
            Next Ch &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}

async function getPages(id: any) {
  const res = await fetch(`https://api.mangadex.org/at-home/server/${id}`);
  const data = await res.json();
  return data;
}

async function getMangaInfo(id: any) {
  const res = await fetch(
    `https://consumet-jade.vercel.app/meta/anilist-manga/info/${id}?provider=mangadex`,
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
}

export default Read;
