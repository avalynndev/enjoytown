"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const router = useRouter();
  const [title, setMangaTitle] = useState("");

  return (
    <main>
      <div className="flex w-full items-center justify-end">
         <Input
          className={cn(
            "relative h-8  justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none  md:w-40 lg:w-64"
          )}
          placeholder="Type to search..."
          type="search"
          name="manga"
          autoComplete="off"
          onChange={(e: any) => setMangaTitle(e.target.value)}
          onKeyDown={(event: any) => {
            if (
              (event.key === "Enter" ||
                event.code === "13" ||
                event.code === "Enter") &&
              title !== ""
            ) {
              router.push(`/manga/${title}`);
            }
          }}
        />
      </div>
    </main>
  );
}
