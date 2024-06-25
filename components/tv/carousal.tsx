import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Show } from "@/types";
import CarousalCard from "@/components/common/card";
import { fetchTvCarousalData } from "@/lib/fetch";

export default async function CarousalComponent() {
  const data = await fetchTvCarousalData("discover");
  if (!data) return <div>None Found</div>;
  return (
    <>
      <Carousel className="mb-10 ">
        <CarouselContent className="w-full mx-auto flex ">
          {data?.map((el: Show) => (
            <CarouselItem key={el.id}>
              <CarousalCard isDetailsPage={false} show={el} type="movie" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
