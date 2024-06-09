"use client";
import Image from "next/image";
import { Pattern } from "@/components/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import { useRouter } from "next/navigation";
// Layout
import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Icons
import { Coins, ArrowRight, Pin } from "lucide-react";
import { Icons } from "@/components/icons";

type BlogPost = {
  title: string;
  content: React.ReactNode;
  author: string;
  date: string;
  image: string;
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
    image: "/blog/updates.jpg",
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
    image: "/blog/hindi-dubbed.jpg",
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
            <div key={index} className="bg-black rounded-lg text-white shadow-md p-6">
              <div className="flex items-center mb-4">
                <Image src={post.image} alt={post.title} width={200} height={200} className="rounded-lg mr-4" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p className="text-sm text-gray-400">
                    By {post.author} on {post.date}
                  </p>
                </div>
              </div>
              <div className="text-gray-300">{post.content}</div>
            </div>
          ))}
        </section>
      </div>
      <footer className="bg-transparent text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm">
              © 2024 EnjoyTown. All rights reserved.
            </p>
            <p className="text-sm">
              Made with ❤️ by the EnjoyTown Team.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
