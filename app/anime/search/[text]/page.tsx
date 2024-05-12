"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";

import { url } from "@/config/url";
import AnimeCard from "@/components/anime/card/main";
import axios from "axios";

const Search = ({ params }: any) => {
  const { text } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [search_results, setSearchResults] = useState<any[]>([]);

  const fetchDetails = useCallback(async () => {
    try {
      const search = await axios.get(url.search + text);
      setSearchResults(search.data.results);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="text-center max-w mx-auto px-6">
        <div className="text-center max-w mx-auto px-6 pb-3">
          <Suspense>
            {isLoading ? (
              <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Array.from({ length: 12 }, () => (
                  <Card className="w-[200px] text-center items-center hover:scale-105 transition-all duration-300 hover:shadow-md dark:hover:shadow-blue-700 hover:shadow-zinc-900">
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
              <div>
                {search_results.length === 0 ? (
                  <div className="flex flex-col text-center items-center justify-center h-screen">
                    <div className="text-4xl font-bold mb-4">
                      No Results Found
                    </div>
                    <div className="text-gray-500 ">
                      Try adjusting your search criteria or check your spelling.
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {search_results.map((anime: any) => (
                      <AnimeCard key={anime.id} anime={anime} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Search;
