import { Poster } from '@/components/common/poster';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { tmdb, TVRelatedType } from '@/lib/tmdb';

type RelatedTvProps = {
  id: string;
  type: TVRelatedType;
};

export default async function RelatedTv({ id, type }: RelatedTvProps) {
  const related = await tmdb.tv.related(Number(id), type, 'en-US');

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {related.results.map((movie) => (
          <CarouselItem key={movie.id} className="basis-1/2 pl-1 md:basis-1/4 lg:basis-1/5">
            <a href={`/tv/${movie.id}`}>
              <Poster url={movie.poster_path} alt={movie.name} className="w-56" />
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
