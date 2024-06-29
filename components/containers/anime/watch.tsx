"use client"
import { useState, useEffect } from "react";
import { env } from "@/env.mjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";

export default function Watch({ id }: any) {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [groupedEpisodes, setGroupedEpisodes] = useState<any[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_watch_data(id);
      const grouped = chunkArray(data, 50);
      setGroupedEpisodes(grouped);
    };

    fetchData();
  }, [id]);

  if (!groupedEpisodes.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="group-select" className="mr-2">
          Select Group:
        </label>
        <select
          id="group-select"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(Number(e.target.value))}
          className="border rounded p-2"
        >
          {groupedEpisodes.map((_, index) => (
            <option key={index} value={index}>
              Group {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {groupedEpisodes[selectedGroup].map((episode: any) => (
          <Link
            key={episode.id}
            href={`/watch/${episode.id}`}
            className="relative flex flex-col rounded p-4"
          >
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl">
              <Image
                src={episode.image}
                alt={
                  episode.title ? episode.title : `Episode ${episode.number}`
                }
                width={1600}
                height={1600}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 z-50 flex items-center justify-center">
                <Button variant={"ghost"} className="h-12 w-12">
                  <Play className="h-6 w-6 text-white" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold">{`Episode ${episode.number}`}</h2>
              <p className="line-clamp-2 text-gray-700 dark:text-slate-300">
                {episode.title ? episode.title : `Episode ${episode.number}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const get_watch_data = async (id: any) => {
  const res = await fetch(
    `${env.CONSUMET_API_ANILIST_URL}/episodes/${id}?provider=gogoanime`,
    {
      next: { revalidate: 21620 },
    }
  );
  const data = await res.json();
  return data;
};

function chunkArray(array: any[], chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
