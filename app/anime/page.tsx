"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";

import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import RecentEpisodeCard from "@/components/anime-card/recent-episode";
import AnimeCard from "@/components/anime-card/main";

import Image from "next/image";
import Link from "next/link";
import { Anime } from "@/types";
import { url } from "@/config/url";

const AnimeHistoryItem = ({ animeHistory }: any) => {
  return (
    <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {animeHistory.map((item: any, index: any) => (
        <div key={index}>
          <Link
            shallow
            href={`/anime/watch/${item.id}/${item.episode_number
              .toString()
              .replace(/\./g, "-")}`}
          >
            <Card className="text-center items-center hover:scale-105 transition-all duration-300">
              <span className="absolute top-3 right-4 px-2 py-1 bg-black text-foreground-400 rounded-xl text-xs">
                EP: {item.episode_number}
              </span>
              <CardHeader>
                <CardTitle className="text-xs h-6">
                  {item.title.length > 24
                    ? item.title.slice(0, 30) + "..."
                    : item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl w-auto object-cover transition-all aspect-[3/4] rounded-md"
                  src={item.image}
                  width={160}
                  height={160}
                />
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topAiring, setTopAiring] = useState<Anime[]>([]);
  const [popular, setPopular] = useState<Anime[]>([]);
  const [recentEpisodes, setRecentEpisodes] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [localItems, setLocalItems] = useState({ AnimeHistory: [] });

  const fetchTopAiring = async () => {
    try {
      const response = await axios.get(url.top_airing);
      setTopAiring(response.data.results);
    } catch (error) {
      setError("Error fetching top airing anime");
    }
  };

  const fetchPopular = async () => {
    try {
      const response = await axios.get(url.popular);
      setPopular(response.data.results);
    } catch (error) {
      setError("Error fetching popular anime");
    }
  };

  const fetchRecentEpisodes = async () => {
    try {
      const response = await axios.get(url.recent_episodes);
      setRecentEpisodes(response.data.results);
    } catch (error) {
      setError("Error fetching recent episodes");
    }
  };

  function get_local() {
    try {
      return JSON.parse(localStorage.getItem("watchHistory") || "");
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  useEffect(() => {
    const fetchDetails = async () => {
      await Promise.all([
        fetchTopAiring(),
        fetchPopular(),
        fetchRecentEpisodes(),
      ]);
      setIsLoading(false);
    };
    fetchDetails();
    const newData = get_local();
    setLocalItems(newData);
  }, []);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="text-center max-w mx-auto px-6">
        <h2 className="text-4xl mb-2 py-4 font-mono">CONTINUE WATCHING</h2>
        <Suspense>
          {isLoading ? (
            <div className="flex flex-col text-center items-center justify-center pb-4">
              <div className="text-gray-500 ">
                Keep watching more and easily continue watching from here..!!
              </div>
            </div>
          ) : (
            <div>
              {localItems.AnimeHistory != null && (
                <AnimeHistoryItem animeHistory={localItems.AnimeHistory} />
              )}
              {localItems.AnimeHistory == null && (
                <div className="flex flex-col text-center items-center justify-center pb-4">
                  <div className="text-gray-500 ">
                    Keep watching more and easily continue watching from
                    here..!!
                  </div>
                </div>
              )}
            </div>
          )}
        </Suspense>
        <Suspense>
          <h2 className="text-4xl mb-4 py-4 font-mono">TOP AIRING</h2>
          {isLoading ? (
            <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 10 }, (_, index) => (
                <Card
                  key={index}
                  className="w-[200px] text-center items-center hover:scale-105 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-xs h-6">
                      <Skeleton className="rounded-md text-tiny text-center h-4" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-visible py-2">
                    <Skeleton className="object-cover rounded-xl h-[230px] w-[270px] h-2/4 w-full object-cover transition-all aspect-[3/4] rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {topAiring.map((anime: any) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          )}
        </Suspense>
        <Suspense>
          <h2 className="text-4xl mb-4 py-4 font-mono">POPULAR</h2>
          {isLoading ? (
            <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 18 }, (_, index) => (
                <Card
                  key={index}
                  className="w-[200px] text-center items-center hover:scale-105 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-xs h-6">
                      <Skeleton className="rounded-md text-tiny text-center h-4" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-visible py-2">
                    <Skeleton className="object-cover rounded-xl h-[230px] w-[270px] h-2/4 w-full object-cover transition-all aspect-[3/4] rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popular.map((anime: any) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          )}
        </Suspense>
        <Suspense>
          <h2 className="text-4xl mb-4 py-4 font-mono">RECENT EPISODES</h2>
          {isLoading ? (
            <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 20 }, (_, index) => (
                <Card
                  key={index}
                  className="w-[200px] text-center items-center hover:scale-105 transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-xs h-6">
                      <Skeleton className="rounded-md text-tiny text-center h-4" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-visible py-2">
                    <Skeleton className="object-cover rounded-xl h-[230px] w-[270px] h-2/4 w-full object-cover transition-all aspect-[3/4] rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentEpisodes.map((anime: any) => (
                <RecentEpisodeCard key={anime.id} anime={anime} />
              ))}
            </div>
          )}
        </Suspense>
      </div>
    </section>
  );
};

export default Main;
