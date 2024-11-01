import Featured from "@/components/featured/tv";
import Carousal from "@/components/carousal/tv";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Carousal/>
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="w-full grid grid-cols-4 pb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="airingtoday">Airing Today</TabsTrigger>
            <TabsTrigger value="toprated">Top Rated</TabsTrigger>
            <TabsTrigger value="ontheair">On the Air</TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Popular
                </h1>

                <p className="text-muted-foreground">
                  Tv Shows ordered by popularity.
                </p>
              </div>
            </div>
            <Featured featureType="popular"/>
          </TabsContent>
          <TabsContent value="airingtoday">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Airing Today
                </h1>

                <p className="text-muted-foreground">
                  Tv Shows that are airing today.
                </p>
              </div>
            </div>
            <Featured featureType="airing_today"/>
          </TabsContent>
          <TabsContent value="toprated">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Top Rated
                </h1>

                <p className="text-muted-foreground">
                  Tv Shows ordered by rating.
                </p>
              </div>
            </div>
            <Featured featureType="top_rated"/>
          </TabsContent>
          <TabsContent value="ontheair">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  On the air
                </h1>

                <p className="text-muted-foreground">
                  Tv Shows that are Airing right now
                </p>
              </div>
            </div>
            <Featured featureType="on_the_air"/>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
