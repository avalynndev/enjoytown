'use client';

import { useEffect, useState } from 'react';
import { MediaPlayer, MediaProvider, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

type ProviderKey = 'embedsu' | '2embed' | 'autoembed' | 'vidsrcsu' | 'primebox' | 'foxstream';

interface VideoPlayerProps {
  id: string;
}

interface SourceFile {
  file: string;
  type: string;
  quality: string;
  lang: string;
}

interface SubtitleFile {
  url: string;
  lang: string;
}

export default function VideoPlayer({ id }: VideoPlayerProps) {
  const [selectedProvider, setSelectedProvider] = useState<ProviderKey>('2embed');
  const [videoSources, setVideoSources] = useState<SourceFile[]>([]);
  const [subtitles, setSubtitles] = useState<SubtitleFile[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!BASE_URL) {
      console.error('BASE_URL is not defined');
      return;
    }

    const fetchVideo = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/movie/${selectedProvider}/${id}`);
        const data = await res.json();

        if (data && data[0]?.source) {
          const files: SourceFile[] = data[0].source.files || [];
          const subs: SubtitleFile[] = data[0].source.subtitles || [];

          setVideoSources(files);
          setSubtitles(subs);
        }
      } catch (error) {
        console.error('Failed to fetch video data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [selectedProvider, id, BASE_URL]);

  const handleProviderChange = (value: ProviderKey) => {
    setSelectedProvider(value);
  };

  const bestSource = videoSources.find((file) => file.quality === '1080p') || videoSources[0];

  return (
    <div className="mx-auto max-w-5xl py-8">
      <div className="flex justify-center pb-4">
        <Select onValueChange={handleProviderChange} value={selectedProvider}>
          <SelectTrigger className="w-[280px] rounded-md px-4 py-2">
            <SelectValue placeholder="Select Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="embedsu">EmbedSu</SelectItem>
            <SelectItem value="2embed">2Embed</SelectItem>
            <SelectItem value="autoembed">AutoEmbed</SelectItem>
            <SelectItem value="vidsrcsu">VidSrcSu</SelectItem>
            <SelectItem value="primebox">Primebox</SelectItem>
            <SelectItem value="foxstream">Foxstream</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading || !bestSource ? (
        <Skeleton className="h-[500px] w-full" />
      ) : (
        <MediaPlayer src={bestSource.file} autoPlay>
          <MediaProvider>
            {subtitles.map((sub, index) => (
              <div key={index}>
                <Track src={sub.url} kind="subtitles" label={sub.lang} default={index === 0} />
              </div>
            ))}
          </MediaProvider>
          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      )}
    </div>
  );
}
