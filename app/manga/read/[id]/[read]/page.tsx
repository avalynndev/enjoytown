import Image from "next/image";
import { PreFetchChaterLinks } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Read({ params }:any) {
  const chapterId = params.read;
  const results = await getPages(chapterId);
  const image_base_url = results.baseUrl + "/data/" + results.chapter.hash;
  const id = params.id;
  const data = await getMangaInfo(id);

  PreFetchChaterLinks(data.chapters);

  if (results.length === 0) {
    return (
      <div>
        <p>This chapter has no content. Please check the next chapter.</p>
      </div>
    );
  }

  let images = [];
  for (var i = 0; i < results.chapter.data.length; i++) {
    var imgUrl = image_base_url + "/" + results.chapter.data[i];
    images.push(imgUrl);
  }

  return (
    <div>
      <aside
        id="sidebar"
        className="hidden lg:block fixed left-0 top-0 z-40 h-screen w-48 transition-transform bg-background"
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto border-slate-200 px-3 py-4">
          <div className="space-y-2 text-sm font-medium">
            <div className="pt-12">
              <h3 className="ml-3 flex-1 text-3xl whitespace-nowrap font-mono">
                CHAPTERS
              </h3>
              <div className="gap-2 pt-4 flex-col items-center ">
                {data.chapters &&
                  data.chapters.map((item: any, index: any) => {
                    if (item.pages !== 0) {
                      return (
                        <div className="py-1">
                          <Link
                            key={index}
                            href={{
                              pathname: `/manga/read/${id}/${item.id}`,
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
      <div className="items-center justify-center flex flex-col">
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
      </div>
    </div>
  );
}

async function getPages(id:any) {
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
