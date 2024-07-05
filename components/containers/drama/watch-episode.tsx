import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const WatchEpisodes = ({ data, id }: any) => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex">
        <div className="flex flex-wrap gap-2 items-center">
          {data &&
            data.map((episodes: any) => (
              <Link
                shallow
                key={`episode-${id}-${episodes.id}`}
                href={`/drama/watch/drama-detail/${id}/${episodes.id}`}
              >
                <Button key={data.id}>{episodes.episode}</Button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WatchEpisodes;
