'use client';
import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';

type VideoSourceKey =
  | 'autoembed'
  | 'embedsu'
  | 'vidsrc'
  | 'superembed'
  | 'twoembed'
  | 'vidlink'
  | 'vidsrcdev'
  | 'vidsrcnl';

export default function VideoPlayer({ id }: any) {
  const [selectedSource, setSelectedSource] = useState<VideoSourceKey>('autoembed');
  const [loading, setLoading] = useState(false);

  const videoSources: Record<VideoSourceKey, string> = {
    autoembed: `https://player.autoembed.cc/embed/movie/${id}`,
    embedsu: `https://embed.su/embed/movie/${id}`,
    vidsrc: `https://vidsrc.in/embed/movie/${id}`,
    superembed: `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    twoembed: `https://www.2embed.cc/embed/${id}`,
    vidlink: `https://vidlink.pro/movie/${id}`,
    vidsrcdev: `https://vidsrc.dev/embed/movie/${id}`,
    vidsrcnl: `https://player.vidsrc.nl/embed/movie/${id}`,
  };

  const handleSelectChange = (value: VideoSourceKey) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedSource(value);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-5xl py-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col flex-wrap pb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/movie/${id}`}>
                  Movie - {id.charAt(0).toUpperCase() + id.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Watch</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center">
        <div className="flex flex-col text-center">
          <Select onValueChange={handleSelectChange} value={selectedSource}>
            <SelectTrigger className="w-[280px] rounded-md px-4 py-2">
              <SelectValue placeholder="Select Video Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="autoembed">AutoEmbed</SelectItem>
              <SelectItem value="embedsu">EmbedSu</SelectItem>
              <SelectItem value="vidsrc">VidSrc</SelectItem>
              <SelectItem value="superembed">SuperEmbed</SelectItem>
              <SelectItem value="twoembed">2Embed</SelectItem>
              <SelectItem value="vidlink">VidLink</SelectItem>
              <SelectItem value="vidsrcdev">VidSrcDev</SelectItem>
              <SelectItem value="vidsrcnl">VidSrcnl</SelectItem>
            </SelectContent>
          </Select>
          <div className="pt-2">
            <Link href={`https://dl.vidsrc.vip/movie/${id}`}>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
                <Download className="mr-1.5" size={12} />
                Download Movie
              </Badge>
            </Link>
          </div>
        </div>
      </div>
      {loading ? (
        <Skeleton className="mx-auto h-[500px] w-full px-4 pt-6" />
      ) : (
        <iframe
          src={videoSources[selectedSource]}
          referrerPolicy="origin"
          allowFullScreen
          width="100%"
          height="450"
          scrolling="no"
          className="mx-auto max-w-3xl px-4 pt-6"
        />
      )}
    </div>
  );
}
