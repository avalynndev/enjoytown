import FeaturedAnime from "@/components/featured/anime";
import Carousal from "@/components/carousal/anime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Carousal />
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="w-full grid grid-cols-3 pb-4">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="trending">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Trending Anime
                </h1>

                <p className="text-muted-foreground">
                  Anime ordered by trending.
                </p>
              </div>
            </div>
            <FeaturedAnime featureType="trending"/>
          </TabsContent>
          <TabsContent value="popular">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Popular Anime
                </h1>

                <p className="text-muted-foreground">
                  Anime that are all-time popular.
                </p>
              </div>
            </div>
            <FeaturedAnime featureType="popular"/>
          </TabsContent>
          <TabsContent value="recent">
            <div className="flex items-center justify-between gap-2 pb-4 py-4">
              <div>
                <h1 className="text-2xl font-mono leading-tight tracking-tighter md:text-4x font-bold">
                  Recent Episodes
                </h1>

                <p className="text-muted-foreground">Episodes released recently</p>
              </div>
            </div>
            <FeaturedAnime featureType="recent"/>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
