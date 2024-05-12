import PopularMovies from "@/components/movie/card/popular";
import TrendingMovies from "@/components/movie/card/trending";

export default async function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
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
  );
}
