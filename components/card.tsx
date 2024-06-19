import { Show } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from 'next/link'

interface CarousalCardProps {
  isDetailsPage?: boolean;
  show: Show;
  type?: string;
  id?: string;
}

export default function CarousalCard(props: CarousalCardProps) {
  const { show, isDetailsPage, type } = props;

  return (
    <>
      {props.show && (
        <>
          <div className="flex md:hidden   h-[70vh]   relative">
            <img
              alt=""
              className="inset-0 object-cover rounded-t-xl   h-full w-full"
              src={`https://image.tmdb.org/t/p/original/${props.show.poster_path}`}
            />
            <div className="   border-white absolute flex justify-between bg-gradient-to-t from-background to-transparent bottom-0 top-1/2 w-full   flex-col    ">
              <div></div>
              <div className="flex items-center flex-col">
                <div className="text-3xl text-pretty flex text-center w-9/12 items-center justify-center  font-bold">
                  {props.show.title || props.show.name}
                </div>
                <div className="opacity-50">
                  {props.show.genres?.name?.join(",") || "Comedy"}{" "}
                  {" • " +
                    (
                      props.show.release_date || props.show.first_air_date
                    ).split("-")[0]}
                </div>

                {props.show.genres?.map((genre: any) => {
                  return (
                    <Badge
                      key={genre.id}
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      {genre.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="relative h-[70vh] md:flex hidden w-full  mx-auto  ">
            <img
              alt=""
              className=" h-full w-full rounded-t-xl object-center object-cover"
              src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
            />
            <div className="inset-0 bg-gradient-to-t from-background to-from-background/10  absolute justify-between flex flex-col">
              <div></div>
              <div className="w-[96%] mx-auto">
                <div className=" flex gap-1 flex-col  uppercase w-[500px] text-pretty">
                  <div className="text-sm normal-case opacity-50">
                    {format(
                      new Date(show.first_air_date || show.release_date),
                      "PPP"
                    )}
                  </div>
                  <div className="text-3xl text-pretty font-bold ">
                    {show.title || show.name}
                  </div>
                  <div className="text-xs opacity-50 normal-case line-clamp-3">
                    {show?.overview}
                  </div>
                  <div className="flex my-2  gap-2">
                    <Link href={`/movie/${show.id}`}>
                      <Button
                        variant={"ringHover"}
                        className="whitespace-nowrap w-full"
                      >
                        Go To Show
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
