import PopularTv from "@/components/tv/card/popular";
import TrendingTv from "@/components/tv/card/trending";

export default async function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex justify-center mb-4 mt-8">
        <h1 className="text-3xl font-mono leading-tight tracking-tighter md:text-4xl">
          POPULAR TV SHOWS
        </h1>
      </div>
      <PopularTv />
      <div className="flex justify-center mb-4 mt-8">
        <h1 className="text-3xl font-mono leading-tight tracking-tighter md:text-4xl">
          TRENDING TV SHOWS
        </h1>
      </div>
      <TrendingTv />
    </section>
  );
}
