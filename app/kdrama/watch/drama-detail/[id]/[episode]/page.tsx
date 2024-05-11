"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState, useCallback, useEffect } from "react";
import { getVideoLink, getDramaInfoOnWatch } from "@/lib/fetch";
import WatchEpisodeButtons from "@/components/kdrama/containers/watch-episode";
import { DramaInfo } from "@/types";

const EpisodeContainer = ({ params }: any) => {
  const { id, episode } = params;
  const [isLoading, setLoading] = useState(true);
  const [videoLink, setVideoLink] = useState(null);
  const [info, setDramaInfo] = useState<DramaInfo | null>(null);
  const fetchDetails = useCallback(async () => {
    try {
      const episode_link = await getVideoLink(episode, id);
      const info = await getDramaInfoOnWatch(id);
      setVideoLink(episode_link);
      setDramaInfo(info);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  }, [id, episode]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <div className="pb-1 mx-auto px-4 pt-10">
      <div className="pb-4">
        <div className="flex flex-col text-center items-center justify-center">
          <div className="flex flex-col flex-wrap pb-2">Name: {id}</div>
          <div className="flex flex-col flex-wrap pb-2">Episode: {episode}</div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto flex">
        {isLoading ? (
          <Skeleton className="mx-auto px-4 pt-10 w-full h-[500px]" />
        ) : (
          <>
            <MediaPlayer src={videoLink || ""}>
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
          </>
        )}
      </div>
      {info && <WatchEpisodeButtons data={info?.episodes} id={id} />}
    </div>
  );
};

export default EpisodeContainer;
