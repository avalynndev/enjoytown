import Featured from "@/components/featured/movie";
import Carousal from "@/components/carousal/movie";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
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
            <Featured endpoint="popular"/>
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
            <Featured endpoint="now_playing"/>
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
            <Featured endpoint="top_rated"/>
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
            <Featured endpoint="upcoming"/>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
