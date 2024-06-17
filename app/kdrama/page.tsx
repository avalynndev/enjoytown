import RecentDramas from '@/components/kdrama/card/recent'
import PopularDramas from "@/components/kdrama/card/popular";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex justify-center mb-4 mt-8">
        <h1 className="text-3xl font-mono leading-tight tracking-tighter md:text-4xl">
          POPULAR DRAMAS
        </h1>
      </div>
      <PopularDramas />
      <div className="flex justify-center mb-4 mt-8">
        <h1 className="text-3xl font-mono leading-tight tracking-tighter md:text-4xl">
          RECENT DRAMAS
        </h1>
      </div>
      <RecentDramas />
    </section>
  );
}
