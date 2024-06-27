import React from "react";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function AnimeCard({ anime }: any) {
  const truncatedTitle =
    anime.title.length > 24 ? anime.title.slice(0, 20) + "..." : anime.title;
  return (
    <Link
      shallow
      href={`/anime/watch/${anime.id}/${anime.episodeNumber
        .toString()
        .replace(/\./g, "-")}`}
    >
      <Card className="text-center items-center hover:scale-105 transition-all duration-300">
        <span className="absolute top-3 right-4 px-2 py-1 bg-background text-foreground-400 rounded-xl text-xs">
          EP: {anime.episodeNumber}
        </span>
        <CardHeader>
          <CardTitle className="text-xs h-6">{truncatedTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-auto h-[230px] w-[270px] h-2/4 object-cover transition-all aspect-[3/4] rounded-md"
            src={anime.image}
            width={160}
            height={160}
          />
        </CardContent>
      </Card>
    </Link>
  );
}
