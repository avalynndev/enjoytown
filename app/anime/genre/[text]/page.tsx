"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { Skeleton } from "@/components/ui/skeleton";
import { url } from "@/config/url";
import AnimeCard from "@/components/anime/card/main";
import axios from "axios";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const Genre = ({ params }: any) => {
  const { text } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [genre_results, setGenreResults] = useState<any[]>([]);

  const fetchDetails = useCallback(async () => {
    try {
      const genre = await axios.get(url.genre + "/" + text);
      setGenreResults(genre.data.results);
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
            {Array.from({ length: 10 }, (_, index) => (
              <Card key={index} className="w-[200px] text-center items-center hover:scale-105 transition-all duration-300 hover:shadow-md dark:hover:shadow-blue-700 hover:shadow-zinc-900">
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
          <>
            <div className="px-4 sm:px-6 lg:px-8 pb-8">
              <div className="flex flex-col text-center items-center justify-center">
                <div className="flex flex-col flex-wrap ">
                  <Breadcrumbs size="lg">
                    <BreadcrumbItem>
                      <Link href="/anime/genre">Genre</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      {text.charAt(0).toUpperCase() + text.slice(1)}
                    </BreadcrumbItem>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
            {genre_results.length === 0 ? (
              <div className="flex flex-col text-center items-center justify-center ">
                <div className="text-4xl font-bold mb-4">No Results Found</div>
                <div className="text-gray-500">
                  Did you perhaps take a wrong turn?.
                </div>
              </div>
            ) : (
              <div className="mt-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {genre_results.map((anime: any) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            )}
          </>
        )}
      </Suspense>
    </div>
    </div>
    </section>
  );
};

export default Genre;
