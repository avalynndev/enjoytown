"use client";
import Image from "next/image";
import { Pattern } from "@/components/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import { useRouter } from "next/navigation";
import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Icons
import { Coins, ArrowRight } from "lucide-react";
import { Icons } from "@/components/icons";

type FeatureText = {
  title: string;
  description: string;
  href?: string;
};

const featureText: FeatureText[] = [
  {
    title: "Movie",
    href: "/movie",
    description: "Explore Movie Marvels: Spectacles Await You!",
  },
  {
    title: "Anime",
    href: "/anime",
    description: "Dive into Anime Worlds: Adventures Await!",
  },
  {
    title: "K-drama",
    href: "/kdrama",
    description: "Indulge in K Drama: Emotions Await!",
  },
  {
    title: "Tv Shows",
    href: "/tv",
    description: "Live on TV Shows: Addiction await ≥",
  },
];

const singleFeatureText: FeatureText[] = [
  {
    title: "Manga",
    href: "/manga",
    description: "Unleash Manga Magic: Stories Await!",
  },
];

// Mock data for blog posts
const blogPosts = [
  {
    title: "Add text here",
    slug: "page.tsx",
    excerpt: "page",
  },
  {
    title: "Another Blog Post",
    slug: "another-blog-post",
    excerpt: "Another blog post ",
  },
  {
    title: "New Blog Post",
    slug: "new-blog-post",
    excerpt: "New blog post",
  },
];

export default function Home() {
  const router = useRouter();

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
              Enjoytown is a streaming platform for lazy people who like to
              <br />
              watch millions of movies, series and animes for free.
            </p>
            <div className="flex gap-2">
              <Link href={`/a`}>
                <Button variant="default" disabled>
                  Explore
                </Button>
              </Link>
              <Link href={`/a`}>
                <Button variant="outline" disabled>
                  Create Account
                </Button>
              </Link>
              <Link href={`/changelog`}>
                <Button variant="outline">
                  Changelog
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="space-y-8">
        <Craft.Section className="">
          <Craft.Container className="">
            <div className="flex flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                {featureText.map(({ title, description, href }, index) => (
                  <Link
                    href={`${href}`}
                    className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                    key={index}
                  >
                    <div className="grid gap-4">
                      <h4 className="text-primary text-xl">
                        {title}{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                          -&gt;
                        </span>
                      </h4>
                      <p className="text-base opacity-75">{description}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div>
                {singleFeatureText.map(
                  ({ title, description, href }, index) => (
                    <Link
                      href={`${href}`}
                      className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                      key={index}
                    >
                      <div className="grid gap-4">
                        <h4 className="text-primary text-xl">
                          {title}{" "}
                          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                          </span>
                        </h4>
                        <p className="text-base opacity-75">{description}</p>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </Craft.Container>
        </Craft.Section>
      </section>
      {/* Blog section */}
      <section className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={index}>
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="h-48 overflow-hidden">
                  {/* You can replace this with an actual image */}
                  <img
                    src="https://via.placeholder.com/500x300"
                    alt="Blog Post"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <span className="text-blue-500 hover:text-blue-700 mt-2 block">
                    Read more
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
