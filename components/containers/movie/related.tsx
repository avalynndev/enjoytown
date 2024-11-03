import { Poster } from '@/components/common/poster';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MovieRelatedType, tmdb } from '@/lib/tmdb';

type RelatedMoviesProps = {
  id: string;
  type: MovieRelatedType;
};

export default async function RelatedMovies({ id, type }: RelatedMoviesProps) {
  const related = await tmdb.movies.related(Number(id), type, 'en-US');

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {related.results.map((movie) => (
          <CarouselItem key={movie.id} className="basis-1/2 pl-1 md:basis-1/4 lg:basis-1/5">
            <a href={`/movie/${movie.id}`}>
              <Poster url={movie.poster_path} alt={movie.title} className="w-56" />
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
