import Featured from '@/components/featured/movie';
import Carousal from '@/components/carousal/movie';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Carousal />
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-4 pb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="nowplaying">Now Playing</TabsTrigger>
            <TabsTrigger value="toprated">Top Rated</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <div className="flex items-center justify-between gap-2 py-4 pb-4">
              <div>
                <h1 className="md:text-4x font-mono text-2xl font-bold leading-tight tracking-tighter">
                  Popular Movies
                </h1>

                <p className="text-muted-foreground">Movies ordered by popularity.</p>
              </div>
            </div>
            <Featured featureType="popular" />
          </TabsContent>
          <TabsContent value="nowplaying">
            <div className="flex items-center justify-between gap-2 py-4 pb-4">
              <div>
                <h1 className="md:text-4x font-mono text-2xl font-bold leading-tight tracking-tighter">
                  Now Playing
                </h1>

                <p className="text-muted-foreground">Movies that are currently in theatres.</p>
              </div>
            </div>
            <Featured featureType="now_playing" />
          </TabsContent>
          <TabsContent value="toprated">
            <div className="flex items-center justify-between gap-2 py-4 pb-4">
              <div>
                <h1 className="md:text-4x font-mono text-2xl font-bold leading-tight tracking-tighter">
                  Top Rated
                </h1>

                <p className="text-muted-foreground">Movies ordered by rating.</p>
              </div>
            </div>
            <Featured featureType="top_rated" />
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="flex items-center justify-between gap-2 py-4 pb-4">
              <div>
                <h1 className="md:text-4x font-mono text-2xl font-bold leading-tight tracking-tighter">
                  Upcoming
                </h1>

                <p className="text-muted-foreground">Movies that are being released soon.</p>
              </div>
            </div>
            <Featured featureType="upcoming" />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
