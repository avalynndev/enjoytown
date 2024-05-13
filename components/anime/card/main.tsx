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
    anime.title.length > 24 ? anime.title.slice(0, 30) + "..." : anime.title;
  return (
    <Link shallow href={`/anime/info/${anime.id}`}>
      <Card className="text-center items-center hover:scale-105 transition-all duration-300 hover:shadow-md dark:hover:shadow-blue-700 hover:shadow-zinc-900">
        <CardHeader>
          <CardTitle className="text-xs h-6">{truncatedTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            className="object-cover rounded-xl w-auto object-cover transition-all aspect-[3/4] rounded-md"
            src={anime.image}
            width={160}
            height={160}
            alt="Anime Poster"
          />
        </CardContent>
      </Card>
    </Link>
  );
}
