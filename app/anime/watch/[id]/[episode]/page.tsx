import Link from 'next/link';
import DetailsContainer from '@/components/containers/anime/details';
import Gogoanime from '@consumet/extensions/dist/providers/anime/gogoanime';
import Anilist from '@consumet/extensions/dist/providers/meta/anilist';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import WatchContainer from '@/components/containers/anime/watch';

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

interface WatchDataSources {
  url: string;
  isM3U8: boolean;
  quality: string;
}
export default async function Watch({ params }: any) {
  const { id, episode } = params;
  const anilist = new Anilist(new Gogoanime());

  const data = await anilist.fetchEpisodeSources(episode);
  function removeQueryParams(url: string, paramsToRemove: string[]): string {
    const urlObj = new URL(url);
    paramsToRemove.forEach((param) => urlObj.searchParams.delete(param));
    return urlObj.toString();
  }

  const cleanedUrl = removeQueryParams(data.download || '', ['token', 'expires']);
  const defaultSourceUrl =
    data.sources
      .map((value: any) => {
        const source = value as WatchDataSources;
        if (source.quality === 'default') {
          return source.url;
        }
        return null;
      })
      .filter((url: string | null) => url !== null)[0] || undefined;
  return (
    <div className="mx-auto max-w-6xl px-4 pb-1 pt-10">
      <div className="pb-4">
        <div className="flex flex-col items-center justify-center text-center">
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
      <div className="flex w-full flex-row items-center justify-center">
        <div className="flex flex-col text-center">
          <div className="pb-2">
            <Link href={cleanedUrl}>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
                <Download className="mr-1.5" size={12} />
                Download Episode
              </Badge>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-4xl">
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
}
