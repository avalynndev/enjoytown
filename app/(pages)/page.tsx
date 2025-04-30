import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeroSection from '@/components/hero';

export default async function Home() {
  return (
    <>
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[75vh] items-center md:h-[50vh]">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <Link href={`/`}>
              <Badge variant="outline" className="bg-background">
                Welcome to the town of enjoyment! 🏙️
              </Badge>
            </Link>
            <h1 className="text-6xl font-bold">Explore movies, tv series, and animes!</h1>
            <p className="text-muted-foreground text-sm leading-6">
              EnjoyTown is a streaming platform for lazy people who like to
              <br />
              watch millions of movies, series and animes for free. Go down to watch
            </p>
            <div className="flex gap-2">
              <Button>
                <Link href={`/movie`}>Watch Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <HeroSection />
    </>
  );
}
