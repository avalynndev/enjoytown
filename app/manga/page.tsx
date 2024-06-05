"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/manga/search";


export default function Hero() {

  return (
    <div className="flex items-center flex-col text-center">
      <div className="p-4">
        <div className="my-8 mx-auto max-w-7xl h-[40vh] overflow-hidden border rounded-lg md:rounded-xl">
          <img
            className="h-full not-prose w-full object-cover object-bottom"
            src={
              "https://honeysanime.com/wp-content/uploads/img-common/menu/banner-theme-manga.jpg"
            }
            width={920}
            height={80}
            alt="hero image"
          />
        </div>

          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-6xl font-bold">Explore Mangas!</h1>
            <div className="flex gap-2">
              <SearchBar />
            </div>
          </div>
      </div>
    </div>
  );
}
