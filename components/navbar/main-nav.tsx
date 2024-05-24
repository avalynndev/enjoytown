"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.orbit className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80 text-foreground/60",
            pathname == "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>
        <Link
          href="/movie"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/movie")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Movie
        </Link>
        <Link
          href="/anime"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/anime")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Anime
        </Link>
        <Link
          href="/kdrama"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/kdrama")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Kdrama
        </Link>
        <Link
          href="/tv"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/tv")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          TV
        </Link>
        <Link
          href="/manga"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/manga")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Manga
        </Link>
      </nav>
    </div>
  );
}
