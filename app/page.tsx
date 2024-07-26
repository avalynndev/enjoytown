import { Pattern } from "@/components/ui/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import * as Craft from "@/components/ui/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getInfoURL } from "@/config/url";
import DetailsContainer from "@/components/containers/movie/details";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { HomeFeatures } from "@/components/features";

type Post = {
  title: string;
  content: React.ReactNode;
  date: string;
};

const posts: Post[] = [
   {
    title: "Enjoytown v2 Released!",
    content: (
      <>
        <p>
          Hey EnjoyTown users! In the past few months we have worked day and night for v2 of enjoytown. 
          Here are some of the main changes:
        </p>
        <ul>
          <li>- Managa has been added </li>
          <li>- Improved UI and speed for better experience</li>
          <li>- Added more providers For Movies and tv shows</li>
        </ul>
      </>
    ),
    date: "2024-24-07",
  },
  {
    title: "Exciting Updates Ahead!",
    content: (
      <>
        <p>
          Hey EnjoyTown fans! We&apos;ve got some thrilling news to share with
          you. Get ready for some major upgrades coming your way:
        </p>
        <ul>
          <li>- A fresh new UI design for a more immersive experience</li>
          <li>- Improved performance for seamless streaming</li>
          <li>- Expanded library with even more movies, series, and animes</li>
        </ul>
        <p>
          Stay tuned for these exciting updates and more! We can&apos;t wait to
          enhance your streaming experience on EnjoyTown.
        </p>
      </>
    ),
    date: "2024-08-05",
  },
];

export default async function Home() {
  const id = "801688";
  const data = await get_movie_info(id);
  return (
    <>
      <Pattern variant="checkered" />
      <SiteHeader />
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[75vh] items-center md:h-[50vh]">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-6xl font-bold">
              Explore movies, tv series, and animes!
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              EnjoyTown is a streaming platform for lazy people who like to
              <br />
              watch millions of movies, series and animes for free. Go down to
              watch
            </p>
            <div className="flex gap-2">
              <Button disabled>
                <Link href={`/auth/register`}>
                  Sign up
                </Link>
              </Button>
              <Link href={`/changelog`}>
                <Button variant="outline">Changelog</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="pb-12 py-8">
        <div className="mx-auto aspect-auto w-full max-w-6xl overflow-hidden rounded-md border bg-background shadow-lg dark:shadow-none md:aspect-">
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <DetailsContainer data={data} id={id} embed />
          </Suspense>
        </div>
      </section>
      <HomeFeatures />
      <section className="space-y-8">
        <Craft.Section>
          <Craft.Container>
            <section className="py-8" id="posts">
              <div className="mx-auto max-w-6xl space-y-8">
                <div className="flex flex-col items-center space-y-2">
                  <h2 className="text-2xl font-bold">Latest Posts</h2>
                  <p className="w-2/3 text-center text-muted-foreground">
                    Find out the latest info on what have been updated.
                  </p>
                </div>
              </div>
            </section>
            {posts.map((post, index) => (
              <div
                key={index}
                className="rounded-lg border bg-gradient-to-b from-transparent to-muted/30 p-6 shadow-md mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-sm">{post.date}</p>
                </div>
                {post.content}
              </div>
            ))}
          </Craft.Container>
        </Craft.Section>
      </section>
    </>
  );
}

const get_movie_info = async (id: any) => {
  const res = await fetch(getInfoURL(id), { next: { revalidate: 21620 } });
  const data = await res.json();
  return data;
};
