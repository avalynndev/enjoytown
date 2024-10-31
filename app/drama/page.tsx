"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Card, CardContent, } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";
import { fetchDramaSearch, FetchAnimeInfo } from "@/fetch";
import Image from "next/image";
import Link from "next/link";

export default function DramaSearch() {
  const placeholders = [
    "True beauty (2020)",
    "Lovely runner (2024)",
    "Twenty-five Twenty-one (2022)",
    "Business proposal (2022)",
    "Queen of Tears (2024)",
    "Hidden Love (2023)",
    "All of us are dead (2022)",
    "My demon (2023-2024)",
    "Glory (2022)",
    "Twinkling watermelon (2023)",
    "Vincenzo (2021)",
    "The Uncanny counter (2020-2023)",
    "The Atypical family (2024)",
    "Penthouse (2020-2021)",
    "Hotel del Luna (2019)",
    "Backstreet Rookie (2020)",
    "Sweet Home (2020-2024)",
  ];
  const [title, setTitle] = useState("");
  const [data, setInfoTitle] = useState<any[]>([]);
  const [loadingText, setLoading] = useState<boolean>(false);

  const handleSearch = async (title: string) => {
    if (title) {
      setLoading(true);
      const data = await fetchDramaSearch(title);
      FetchAnimeInfo(data);
      setLoading(false);
      setInfoTitle(data.results);
    }
  };

  // Debounce function to limit the rate of API calls
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: void, ...args: any[]) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), [
    handleSearch,
  ]);

  // Effect to trigger search when title changes
  useEffect(() => {
    if (title) {
      debouncedSearch(title);
    }
  }, [title, debouncedSearch]);

  return (
    <>
      <div className="h-[30rem] flex flex-col justify-center  items-center px-4">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Search for drama.. 📺
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(event) => setTitle(event.target.value)}
          onSubmit={() => handleSearch(title)}
        />
      </div>
      <div className="container gap-6 pb-8 flex items-center flex-col ">
        {loadingText && (
          <div className="w-full gap-x-2 flex justify-center items-center">
            <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full"></div>
            <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full"></div>
            <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full"></div>
          </div>
        )}
        <div className="mt-2  grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data &&
            data.map((item: any, index: any) => {
              return (
                <Link
                  shallow
                  href={`/drama/${encodeURIComponent(item.id)}`}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <Card className="pt-4">
                    <CardContent>
                      <Image
                        className="h-2/4 w-full object-cover rounded-xl transition-all aspect-[3/4]"
                        src={`${process.env.TMDB_PROXY_URL}/fetch?url=${item.image}`}
                        width={160}
                        height={160}
                        alt="Manga Poster"
                      />
                    </CardContent>
                  </Card>

                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-1 px-2 pt-1">
                      <span className="trucate line-clamp-1 pt-1">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}
