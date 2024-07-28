"use client";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type VideoSourceKey =
  | "vidsrc"
  | "vidsrcpro"
  | "vidsrcin"
  | "superembed";

export default function VideoPlayer({ id }: any) {
  const [selectedSource, setSelectedSource] =
    useState<VideoSourceKey>("vidsrc");
  const [loading, setLoading] = useState(false);

  const videoSources: Record<VideoSourceKey, string> = {
    vidsrc: `https://vidsrc.vip/embed/movie/${id}`,
    vidsrcpro: `https://vidsrc.pro/embed/movie/${id}`,
    vidsrcin: `https://vidsrc.in/embed/movie/${id}`,
    superembed: `https://multiembed.mov/?video_id=${id}&tmdb=1`,
  };

  const handleSelectChange = (value: VideoSourceKey) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedSource(value);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pb-8 mx-auto max-w-5xl">
      <div className="flex flex-row items-center justify-center w-full">
        <div className="flex flex-col text-center">
          <Select onValueChange={handleSelectChange} value={selectedSource}>
            <SelectTrigger className="px-4 py-2 rounded-md w-[280px]">
              <SelectValue placeholder="Select Video Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vidsrc">VidSrc</SelectItem>
              <SelectItem value="vidsrcpro">Vidsrc.pro</SelectItem>
              <SelectItem value="vidsrcin">Vid.In</SelectItem>
              <SelectItem value="superembed">SuperEmbed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {loading ? (
        <Skeleton className="mx-auto px-4 pt-6 w-full h-[500px]" />
      ) : (
        <iframe
          src={videoSources[selectedSource]}
          referrerPolicy="origin"
          allowFullScreen
          width="100%"
          height="450"
          scrolling="no"
          className="max-w-3xl mx-auto px-4 pt-6"
        />
      )}
    </div>
  );
}
