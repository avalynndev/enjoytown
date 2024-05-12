"use client";
import React, { useState, useEffect, useCallback } from "react";
import { url } from "@/config/url";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Genre = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState<any[]>([]);

  const fetchDetails = useCallback(async () => {
    try {
      const genre = await axios.get(url.genre + "/" + "list");
      setGenres(genre.data);
      console.log(genre);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col text-center items-center justify-center">
        <div className="text-4xl font-bold mb-4">Genres</div>
        <div className="text-gray-500 pb-8">
          Here&apos;s a diverse list of genres spanning different forms.
        </div>
        {isLoading ? (
          <div className="w-full gap-x-2 flex justify-center items-center">
            <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
            <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
            <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {genres.map((genre) => (
              <Link
                href={`/anime/genre/${genre.id
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                key={genre.id}
              >
                <Button key={genre.id} id={genre.id} className="mt-1 mr-1">
                  {genre.title}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Genre;
