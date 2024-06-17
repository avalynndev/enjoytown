import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import PopularMovies from "@/components/movie/card/popular";
import TrendingMovies from "@/components/movie/card/trending";

const Carousal = dynamic(() => import("@/components/carousal"), {
  ssr: false,
  loading: () => (
    <>
      <div className="flex md:hidden h-[70vh] relative">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="relative h-[70vh] md:flex hidden mx-auto">
        <Skeleton className="object-cover rounded-xl object-cover transition-all rounded-md relative h-[70vh] flex container grid items-center gap-6 pb-8 pt-6 md:py-10" />
      </div>
    </>
  ),
});

export default async function Home() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Carousal />
        <div className="flex justify-center mb-4 mt-8">
          <h1 className="text-3xl font-mono leading-tight tracking-tighter md:text-4xl">
            POPULAR MOVIES
          </h1>
        </div>
        <PopularMovies />
        <div className="flex justify-center mb-4 mt-8">
          <h1 className="text-3xl font-mono leading-tight tracking-tighter md:text-4xl">
            TRENDING MOVIES
          </h1>
        </div>
        <TrendingMovies />
      </section>
    </>
  );
}
