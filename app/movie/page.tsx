import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import Popular from "@/components/movie/card/popular";
import NowPlaying from "@/components/movie/card/nowplaying";
import Upcoming from "@/components/movie/card/upcoming";
import TopRated from "@/components/movie/card/toprated";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Carousal = dynamic(() => import("@/components/movie/carousal"), {
  ssr: false,
  loading: () => (
    <>
      <div className="flex md:hidden h-[70vh] relative">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="relative h-[70vh] md:flex w-full hidden mx-auto">
        <Skeleton className="object-cover rounded-xl transition-all w-full relative h-[70vh] container grid items-center gap-6 pb-8 pt-6 md:py-10" />
      </div>
    </>
  ),
});

export default async function Home() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Carousal />
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="w-full grid grid-cols-4 pb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="nowplaying">Now Playing</TabsTrigger>
            <TabsTrigger value="toprated">Top Rated</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Popular Movies
                </h1>

                <p className="text-muted-foreground">
                  Movies ordered by popularity.
                </p>
              </div>
            </div>
            <Popular />
          </TabsContent>
          <TabsContent value="nowplaying">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Now Playing
                </h1>

                <p className="text-muted-foreground">
                  Movies that are currently in theatres.
                </p>
              </div>
            </div>
            <NowPlaying />
          </TabsContent>
          <TabsContent value="toprated">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Top Rated
                </h1>

                <p className="text-muted-foreground">
                  Movies ordered by rating.
                </p>
              </div>
            </div>
            <TopRated />
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Upcoming
                </h1>

                <p className="text-muted-foreground">
                  Movies that are being released soon.
                </p>
              </div>
            </div>
            <Upcoming />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
