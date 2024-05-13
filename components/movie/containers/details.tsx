import React from "react";
import Image from "next/image";
import {Button} from '@/components/ui/button'

const DetailsContainer = ({ data }: any) => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto lg:flex">
        <div className="pb-10 pr-5">
          <div
            className="rounded-lg overflow-hidden bg-white shadow-md"
            style={{ width: "250px", height: "370px" }}
          >
            <div className="relative h-96">
              <Image
                src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://image.tmdb.org/t/p/original${data.poster_path}`}
                fill
                alt="Movie Poster"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              ></Image>
            </div>
          </div>
        </div>
        <div className=" pr-4">
          <h1 className="text-3xl font-semibold">{data.title || "No Title"}</h1>
          <div className="mt-2 font-mono">
            <strong>{data.tagline || "No Tagline"}</strong>
          </div>
          <div className="mt-2">
            <strong>Released On: </strong>
            {data.release_date || "Unknown"}
          </div>
          <div className="mt-2 gap-2">
            <strong>Genres: </strong>
            <div className="max-w-3xl mx-auto flex">
              <div className="flex flex-wrap gap-2 items-center">
                {data.genres.map((item: any) => (
                  <Button key={item.id} size="sm">
                    {item.name || "Not found"}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <strong>Overview:</strong>
            <div className="flex">{data.overview || "Not found"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
