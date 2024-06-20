import { Pattern } from "@/components/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import RecentDramas from "@/components/kdrama/card/recent";
import Popular from "@/components/movie/card/popular";

export default function Home() {
  return (
    <>
      <Pattern variant="checkered" />
      <SiteHeader />
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[75vh] items-center md:h-[50vh]">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-6xl font-bold">Explore</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Explore popular movies, recent dramas, upcoming tv shows and more.
            </p>
          </div>
        </section>
      </div>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex mb-4 mt-8">
          <h1 className="text-3xl font-mono leading-tight tracking-tighter md:text-4xl">
            POPULAR MOVIES
          </h1>
        </div>
        <Popular />
        <div className="flex mb-4 mt-8">
          <h1 className="text-3xl font-mono leading-tight tracking-tighter md:text-4xl">
            UPCOMING TV SHOWS
          </h1>
        </div>
        <div className="flex mb-4 mt-8">
          <h1 className="text-3xl font-mono leading-tight tracking-tighter md:text-4xl">
            RECENT DRAMAS
          </h1>
        </div>
        <RecentDramas />
      </section>
    </>
  );
}
