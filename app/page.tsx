import { Pattern } from "@/components/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Post = {
  title: string;
  content: React.ReactNode;
  date: string;
};

const posts: Post[] = [
  {
    title: "📌 Exciting Updates Ahead!",
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
  {
    title: "📌 Hindi Dubbed Movie Added!",
    content: (
      <>
        <div>
          We&apos;re excited to announce that we&apos;ve added a new collection
          of Hindi dubbed movies to our website. Now you can enjoy your favorite
          movies in Hindi too!
        </div>
      </>
    ),
    date: "2024-08-06",
  },
];

export default function Home() {
  return (
    <>
      <Pattern variant="checkered" />
      <SiteHeader />
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[75vh] items-center md:h-[50vh]">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-6xl font-bold">EnjoyTown</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              EnjoyTown is a streaming platform for lazy people who like to
              <br />
              watch millions of movies, series and animes for free. Go down to
              watch
            </p>
            <div className="flex gap-2">
              <Link href={`/explore`}>
                <Button variant="default">
                  Explore
                </Button>
              </Link>
              <Link href={`/a`}>
                <Button variant="outline" disabled>
                  Create Account
                </Button>
              </Link>
              <Link href={`/changelog`}>
                <Button variant="outline">Changelog</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="space-y-8">
        <Craft.Section>
          <Craft.Container>
            <h2 className="text-3xl font-bold mb-4">Latest Posts</h2>
            {posts.map((post, index) => (
              <div key={index} className="rounded-lg border shadow-md p-6 mb-8">
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
