import { Pattern } from '@/components/ui/pattern';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeroSection from '@/components/hero';

export default async function Home() {
  return (
    <>
      <Pattern variant="checkered" />
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[75vh] items-center md:h-[50vh]">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            {/**  
            <Link
              href={`/`}
              className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs shadow"
            >
              a{" "}
              <span className="animate-shine rounded-full border bg-[linear-gradient(110deg,#ffffff,45%,#f1f1f1,55%,#ffffff)] bg-[length:200%_100%] px-2 py-[1px] text-[10px] text-foreground dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] dark:text-white">
                PRO
              </span>
            </Link>
          **/}
            <h1 className="text-6xl font-bold">Explore movies, tv series, and animes!</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              EnjoyTown is a streaming platform for lazy people who like to
              <br />
              watch millions of movies, series and animes for free. Go down to watch
            </p>
            <div className="flex gap-2">
              <Button disabled>
                <Link href={`/auth/register`}>Sign up</Link>
              </Button>
              <Link href={`/changelog`}>
                <Button variant="outline">Changelog</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <HeroSection />
    </>
  );
}
