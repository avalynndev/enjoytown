import React from "react";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import Link from "next/link";
import Image from "next/image";

export default function AnimeCard({ anime }: any) {
  const truncatedTitle =
    anime.title.length > 24 ? anime.title.slice(0, 30) + "..." : anime.title;
  return (
    <Link shallow href={`/anime/info/${anime.id}`}>
      <Card className="text-center items-center hover:scale-105 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xs h-6">{truncatedTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            className="object-cover rounded-xl w-auto h-[230px] w-[270px] h-2/4 object-cover transition-all aspect-[3/4] rounded-md"
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
