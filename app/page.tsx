import { Pattern } from '@/components/ui/pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeroSection from '@/components/hero';

export default async function Home() {
  return (
    <>
      <Pattern variant="checkered" />
      <section className="mx-auto flex h-[80dvh] max-w-4xl flex-col items-center justify-center gap-4 px-4 py-8 text-center md:h-auto md:px-6 md:py-24">
        <Link href={'/'}>
          <Badge variant="outline" className="bg-background">
            Welcome to the town of enjoyment! 🏙️
          </Badge>
        </Link>

        <h2 className="text-3xl leading-tight md:text-6xl md:leading-[1.2]">
          Explore movies, tv series,
          <br /> and <b>animes!</b>
        </h2>

        <p className="text-muted-foreground max-w-xs text-base md:max-w-2xl">
          {' '}
          EnjoyTown is a streaming platform for lazy people who like to
          <br />
          watch millions of movies, series and animes for free. Go down to watch
        </p>

        <Button size="sm" asChild>
          <Link href={`/movie`}>Watch Now</Link>
        </Button>
      </section>
      <HeroSection />
    </>
  );
}
