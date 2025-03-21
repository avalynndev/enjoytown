import Link from 'next/link';
import { HiAnime } from 'aniwatch';
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

export default async function Watch({ params }: any) {
  const { id, episode } = await params;
  const hianime = new HiAnime.Scraper();
  const data = await hianime.getEpisodeSources(
    episode.replace(/\$?episode\$?\d*/gi, '?ep=').replace(/%24/g, ''),
    'hd-2',
    'sub',
  );

  const m3u8Source = data.sources.find((source) => source.type === 'hls')?.url || '';
  const proxy = `${process.env.PROXY_M3U8}`;
  const vidURL = proxy + m3u8Source;
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
            <Link href={''}>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
                <Download className="mr-1.5" size={12} />
                Download Episode
              </Badge>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-4xl">
        {m3u8Source ? (
          <MediaPlayer src={vidURL} autoPlay>
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        ) : (
          <p className="text-center text-red-500">No playable source found.</p>
        )}
      </div>
      <div className="py-8">
        <WatchContainer id={id} />
      </div>
    </div>
  );
}
