import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { get_popular_anime } from "@/fetch";
import CarousalCard from "@/components/carousal/card";

export default async function CarousalComponent() {
  const data = await get_popular_anime();
  if (!data) return <div>None Found</div>;
  return (
    <>
      <Carousel className="mb-10 ">
        <CarouselContent className="w-full mx-auto flex ">
          {data.results?.map((el: any) => (
            <CarouselItem key={el.id}>
              <CarousalCard show={el} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
