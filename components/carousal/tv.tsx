import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import CarousalCard from "@/components/common/card";
import { tmdb } from "@/lib/tmdb";

export default async function CarousalComponent() {
  const trending = await tmdb.tv.trending("day", "en-US");
  if (!trending) return <div>None Found</div>;

  return (
    <>
      <Carousel className="mb-10 ">
        <CarouselContent className="w-full mx-auto flex ">
          {trending.results?.map(tvShow => (
            <CarouselItem key={tvShow.id}>
              <CarousalCard isDetailsPage={false} show={tvShow} type="tv" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
