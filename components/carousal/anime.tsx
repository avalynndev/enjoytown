import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Zoro from 'avalynndev-extensions/dist/providers/anime/zoro';
import Anilist from 'avalynndev-extensions/dist/providers/meta/anilist';
import CarousalCard from '@/components/carousal/card';

export default async function CarousalComponent() {
  const anilist = new Anilist(new Zoro());
  const data = await anilist.fetchPopularAnime(1, 20);

  if (!data) return <div>None Found</div>;

  return (
    <>
      <Carousel className="mb-10">
        <CarouselContent className="mx-auto flex w-full">
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
