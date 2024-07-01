import { AnimeShow } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CarouselCardProps {
  show: AnimeShow;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ show }) => {
  return (
    <>
      <div className="flex md:hidden h-[70vh] relative">
        <img
          alt={show.title.userPreferred}
          className="inset-0 object-cover rounded-t-xl h-full w-full"
          src={show.image}
        />
        <div className="border-white absolute flex justify-between bg-gradient-to-t from-background to-transparent bottom-0 top-1/2 w-full flex-col">
          <div></div>
          <div className="flex items-center flex-col">
            <div className="text-3xl text-pretty flex text-center w-9/12 items-center justify-center font-bold">
              {show.title.english || show.title.romaji}
            </div>
            <div className="opacity-50">
              {show.genres.join(", ") || "Comedy"}{" "}
            </div>

            {show.genres.map((genre, index) => (
              <Badge key={index} variant="outline" className="whitespace-nowrap">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="relative h-[70vh] md:flex hidden w-full mx-auto">
        <img
          alt={show.title.userPreferred}
          className="h-full w-full rounded-t-xl object-center object-cover"
          src={show.cover}
        />
        <div className="inset-0 bg-gradient-to-t from-background to-from-background/10 absolute justify-between flex flex-col">
          <div></div>
          <div className="w-[96%] mx-auto">
            <div className="flex gap-1 flex-col uppercase w-[500px] text-pretty">
              <div className="text-sm normal-case opacity-50">
                {format(new Date(show.releaseDate), "MMMM yyyy")}
              </div>
              <div className="text-3xl text-pretty font-bold ">
                {show.title.english || show.title.romaji}
              </div>
              <div className="text-xs opacity-50 normal-case line-clamp-3">
                {show.description}
              </div>
              <div className="flex my-2 gap-2">
                <Link href={`/anime/${show.id}`}>
                  <Button variant={"ringHover"} className="whitespace-nowrap w-full">
                    Go To Show
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselCard;
