"use client";
import { Pattern } from "@/components/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import { useRouter } from "next/navigation";
import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Coins, ArrowRight, Pin } from "lucide-react";
import { Icons } from "@/components/icons";

type BlogPost = {
  title: string;
  content: React.ReactNode;
  author: string;
  date: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "Exciting Updates Ahead!",
    content: (
      <>
        <p>
          Hey EnjoyTown fans! We've got some thrilling news to share with you. Get ready for some major upgrades coming your way:
        </p>
        <ul>
          <li>- A fresh new UI design for a more immersive experience</li>
          <li>- Improved performance for seamless streaming</li>
          <li>- Expanded library with even more movies, series, and animes</li>
        </ul>
        <p>
          Stay tuned for these exciting updates and more! We can't wait to enhance your streaming experience on EnjoyTown.
        </p>
      </>
    ),
    author: "EnjoyTown Team",
    date: "2024-08-05",
  },
  {
    title: "Hindi Dubbed Movies Added!",
    content: (
      <>
        <p>
          We're excited to announce that we've added a new collection of Hindi dubbed movies to our website. Now you can enjoy your favorite movies in Hindi too!
        </p>
        <p>
          Our Hindi dubbed collection includes a wide range of genres, from action-packed blockbusters to heartwarming dramas. Whether you prefer Bollywood classics or Hollywood hits, we've got you covered.
        </p>
        <p>
          Explore our Hindi dubbed movie section and immerse yourself in the world of cinema. Happy streaming!
        </p>
      </>
    ),
    author: "Enjoy Team",
    date: "2024-08-06",
  },
];

export default function BlogPage() {
  const router = useRouter();
  return (
    <>
      <Pattern variant="checkered" />
      <SiteHeader />
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">EnjoyTown Blog</h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest news and announcements from EnjoyTown.
            </p>
          </div>
        </section>
        <section className="space-y-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-black rounded-lg text-white shadow-md p-6 md:p-8 lg:p-10"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-400">
                  By {post.author} on {post.date}
                </p>
              </div>
              <div className="text-gray-300 mb-6">{post.content}</div>
              <div className="flex justify-end">
                <Button variant="outline" className="text-sm">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
