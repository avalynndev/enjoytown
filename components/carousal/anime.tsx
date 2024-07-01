import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Show } from "@/types";
import CarousalCard from "@/components/carousal/card";

export default async function CarousalComponent() {
  const data = await get_popular();
  if (!data) return <div>None Found</div>;
  return (
    <>
      <Carousel className="mb-10 ">
        <CarouselContent className="w-full mx-auto flex ">
          {data.results?.map((el:any) => (
            <CarouselItem key={el.id}>
              <CarousalCard show={el} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

const get_popular = async () => {
  const res = await fetch(
    "https://consumet-jade.vercel.app/meta/anilist/popular",
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
};
