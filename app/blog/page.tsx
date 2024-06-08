"use client";
import { Pattern } from "@/components/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import Link from "next/link";

// Mock data for blog posts
const blogPosts = [
  {
    title: "Add text here",
    slug: "add-text-here",
    excerpt: "Add text here",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    title: "Another Blog Post",
    slug: "another-blog-post",
    excerpt: "Another blog post excerpt",
    content: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et...",
  },
  {
    title: "New Blog Post",
    slug: "new-blog-post",
    excerpt: "New blog post excerpt",
    content: "Vestibulum id ligula porta felis euismod semper...",
  },
];

export default function Blog() {
  return (
    <>
      <Pattern variant="checkered" />
      <SiteHeader />
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[50vh] items-center">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold">Blog</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Stay updated with the latest news and articles.
            </p>
          </div>
        </section>
      </div>
      <section className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden">
                {/* You can replace this with an actual image */}
                <img
                  src="https://via.placeholder.com/500x300"
                  alt="Blog Post"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <p className="text-gray-800 mb-4">{post.content}</p>
                <Link href={`/blog/${post.slug}`}>
                  <span className="text-blue-500 hover:text-blue-700">
                    Read more
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
