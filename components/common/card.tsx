import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Show } from '@/types';

interface CarousalCardProps {
  show: Show;
  type?: 'tv' | 'movie' | 'anime';
  id?: string;
}

export default function CarousalCard({ show, type }: CarousalCardProps) {
  const title = show.title || show.name || 'Unknown Title';
  const releaseDate = show.release_date || show.first_air_date || 'Unknown Date';

  return (
    <>
      <div className="relative flex h-[70vh] md:hidden">
        <Image
          alt={title}
          className="inset-0 h-full w-full rounded-t-xl object-cover"
          src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
          width={500}
          height={500}
        />
        <div className="absolute bottom-0 top-1/2 flex w-full flex-col justify-between border-white bg-gradient-to-t from-background to-transparent">
          <div></div>
          <div className="flex flex-col items-center">
            <div className="flex w-9/12 items-center justify-center text-pretty text-center text-3xl font-bold">
              {title}
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto hidden h-[70vh] w-full md:flex">
        <Image
          alt={title}
          className="h-full w-full rounded-t-xl object-cover object-center"
          src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
          width={500}
          height={500}
        />
        <div className="to-from-background/10 absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-background">
          <div></div>
          <div className="mx-auto w-[96%]">
            <div className="flex w-[500px] flex-col gap-1 text-pretty uppercase">
              <div className="text-sm normal-case opacity-50">
                {releaseDate ? format(new Date(releaseDate), 'PPP') : 'Unknown'}
              </div>
              <div className="text-pretty text-3xl font-bold">{show.title || show.name}</div>
              <div className="line-clamp-3 text-xs normal-case opacity-50">{show?.overview}</div>
              <div className="my-2 flex gap-2">
                <Link href={`/${type}/${show.id}`}>
                  <Button variant={'ringHover'} className="w-full whitespace-nowrap">
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
}
