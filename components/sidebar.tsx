"use client"
import { useState } from "react";
import Link from "next/link";
import { Book, TvMinimalPlay, Drama, Tv } from "lucide-react";

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <aside
        className={`fixed inset-y-0 right-0 z-30 w-64 flex-col border-r p-4 transform transition-transform duration-300  3xl:translate-x-0`}
      >
        <nav className="flex flex-col space-y-1 mt-24">
          <Link
            href="/list"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <FileIcon className="h-4 w-4" />
            Introduction
          </Link>
          <Link
            href="/list/mtv"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <TvMinimalPlay className="h-4 w-4" />
            Movie/TV
          </Link>
          <Link
            href="/list/anime"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <Tv className="h-4 w-4" />
            Anime
          </Link>
          <Link
            href="/list/drama"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <Drama className="h-4 w-4" />
            Drama
          </Link>
          <Link
            href="/list/manga"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <Book className="h-4 w-4" />
            Manga
          </Link>
        </nav>
      </aside>
    </>
  );
}

function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
