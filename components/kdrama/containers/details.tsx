import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const DetailsContainer = ({ data }: any) => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto lg:flex">
        <div className="pb-10 pr-5">
          <div
            className="rounded-lg overflow-hidden bg-white shadow-md"
            style={{ width: "250px" }}
          >
            <div className="relative h-96">
              <Image
                src={data.image}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Anime Cover"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className=" pr-4">
          <h1 className="text-3xl font-semibold">{data.title}</h1>
          <div className="mt-2">
            <strong>Another Name:</strong>
            {data.otherNames &&
              data.otherNames.map((item: any, index: any) => (
                <p key={index}>{item}</p>
              ))}
          </div>
          <div className="mt-2 gap-2">
            <strong>Genres: </strong>
              <div className="max-w-3xl mx-auto flex">
                <div className="flex flex-wrap gap-2 items-center">
                  {data.otherNames &&
                    data.genres.map((genre: any, index: any) => (
                      <Button key={index} size="sm">
                        {genre.trim()}
                      </Button>
                    ))}
                </div>  
              </div>
          </div>
          <div className="mt-2">
            <strong>Description:</strong>
            <div className="flex">{data.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
