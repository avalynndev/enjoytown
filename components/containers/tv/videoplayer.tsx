'use client';

import * as React from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';
import Link from 'next/link';
import { API_KEY } from '@/config/url';
import { Episode, Season, SeasonDetails, tmdb } from '@/lib/tmdb';

export default function VideoPlayer({ id }: { id: string }) {
  const [seasons, setSeasons] = React.useState<Season[]>([]);
  const [episodes, setEpisodes] = React.useState<Episode[]>([]);
  const [season, setSeason] = React.useState('1');
  const [episode, setEpisode] = React.useState('1');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchEpisodes = React.useCallback(
    async (seasonNumber: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const season = await tmdb.season.details(Number(id), seasonNumber, 'en-US');

        setEpisodes(season.episodes || []);
        if (season.episodes.length > 0) {
          setEpisode(season.episodes[0].episode_number.toString());
        }
      } catch (error: unknown) {
        console.error('Error fetching episodes:', error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    },
    [id],
  );

  React.useEffect(() => {
    if (season) {
      fetchEpisodes(Number(season));
    }
  }, [season, fetchEpisodes]);

  const fetchSeasons = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const series = await tmdb.tv.details(Number(id), 'en-US');
      const relevantSeasons = series.seasons.filter((s) => s.season_number > 0);

      setSeasons(relevantSeasons || []);
      if (relevantSeasons.length > 0) {
        setSeason(relevantSeasons[0].season_number.toString());
      }
    } catch (error: unknown) {
      console.error('Error fetching seasons:', error);
      setError(error instanceof Error ? error.message : String(error));
      setSeasons([]);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchSeasons();
  }, [fetchSeasons]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <Skeleton className="mx-auto h-[500px] w-full px-4 pt-6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <Skeleton className="mx-auto h-[500px] w-full px-4 pt-6" />{' '}
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="pb-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex w-full max-w-sm items-center space-x-2 rounded-md pl-4">
            <div className="flex items-center space-x-2">
              <Select
                value={season}
                onValueChange={(e) => setSeason(e)}
                disabled={isLoading || seasons.length === 0}
              >
                <SelectTrigger className="w-[180px] rounded-md px-4 py-2">
                  <SelectValue placeholder="Select Video Source" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.length > 0 ? (
                    seasons.map((s) => (
                      <SelectItem key={s.season_number} value={s.season_number.toString()}>
                        Season {s.season_number}
                      </SelectItem>
                    ))
                  ) : (
                    <></>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={episode}
                onValueChange={(e) => setEpisode(e)}
                disabled={isLoading || episodes.length === 0}
              >
                <SelectTrigger className="w-[180px] rounded-md px-4 py-2">
                  <SelectValue placeholder="Select Video Source" />
                </SelectTrigger>
                <SelectContent>
                  {episodes.length > 0 ? (
                    episodes.map((s) => (
                      <SelectItem key={s.episode_number} value={s.episode_number.toString()}>
                        Episode {s.episode_number}
                      </SelectItem>
                    ))
                  ) : (
                    <></>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="pt-2">
            <Link href={`https://dl.vidsrc.vip/tv/${id}/${season}/${episode}`}>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
                <Download className="mr-1.5" size={12} />
                Download {season}-{episode}
              </Badge>
            </Link>
          </div>
        </div>
      </div>
      <Tabs defaultValue="autoembed">
        <div className="flex flex-col items-center">
          <TabsList>
            <TabsTrigger value="autoembed">AutoEmbed</TabsTrigger>
            <TabsTrigger value="embedsu">EmbedSu</TabsTrigger>
            <TabsTrigger value="vidsrc">VidSrc</TabsTrigger>
            <TabsTrigger value="superembed">SuberEmbed</TabsTrigger>
            <TabsTrigger value="2embed">2Embed</TabsTrigger>
            <TabsTrigger value="vidlink">VidLink</TabsTrigger>
            <TabsTrigger value="vidsrcdev">VidSrc.dev</TabsTrigger>
            <TabsTrigger value="vidsrcnl">VidSrc.nl</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="autoembed">
          <iframe
            src={`https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="mx-auto max-w-3xl px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="embedsu">
          <iframe
            src={`https://embed.su/embed/tv/${id}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="mx-auto max-w-3xl px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="vidsrc">
          <iframe
            src={`https://vidsrc.in/embed/tv/${id}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="mx-auto max-w-3xl px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="superembed">
          <iframe
            src={`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="mx-auto max-w-3xl px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="2embed">
          <iframe
            src={`https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="mx-auto max-w-3xl px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="vidlink">
          <iframe
            src={`https://vidlink.pro/tv/${id}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="mx-auto max-w-3xl px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="vidsrcdev">
          <iframe
            src={`https://vidsrc.dev/embed/tv/${id}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="mx-auto max-w-3xl px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="vidsrcnl">
          <iframe
            src={`https://player.vidsrc.nl/embed/tv/${id}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="mx-auto max-w-3xl px-4 pt-10"
          ></iframe>
        </TabsContent>
      </Tabs>
    </div>
  );
}
