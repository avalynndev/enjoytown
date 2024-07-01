import EpisodeContainer from "@/components/containers/anime/episode";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import WatchContainer from "@/components/containers/anime/watch";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

interface WatchDataSources {
  url: string;
  isM3U8: boolean;
  quality: string;
}
export default async function Watch({ params }: any) {
  const {id, episode} = params;
  const data = await get_data(episode)
  const defaultSourceUrl = data.sources
    .map((value:any) => {
      const source = value as WatchDataSources;
      if (source.quality === "default") {
        return source.url;
      }
      return null;
    })
    .filter((url:any) => url !== null)[0];
  return (
    <div className="max-w-6xl pb-1 mx-auto px-4 pt-10">
      <div className="pb-4">
        <div className="flex flex-col text-center items-center justify-center">
          <div className="flex flex-col flex-wrap pb-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/anime/${id}`}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{episode}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto flex">
        <MediaPlayer src={defaultSourceUrl}>
          <MediaProvider />
          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      </div>
      <div className="py-8">
        <WatchContainer id={id} />
      </div>
    </div>
  );
};


const get_data = async (episode: any) => {
  const res = await fetch(
    `${process.env.CONSUMET_API_ANILIST_URL}/watch/${episode}`,
    {
      next: { revalidate: 21620 },
    }
  );
  const data = await res.json();
  return data;
};

