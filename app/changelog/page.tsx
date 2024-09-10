"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

const changelogEntries: ChangelogEntry[] = [
  {
    version: "2.1.0",
    date: "2024-06-28",
    changes: [
      "Added cooler and fresh ui",
      "Added New List Feature",
      "Fixed minor bugs",
    ],
  },
  {
    version: "1.2.0",
    date: "2024-06-08",
    changes: [
      "Added new movie categories",
      "Improved search functionality",
      "Fixed minor bugs and performance issues",
    ],
  },
  {
    version: "1.1.0",
    date: "2024-05-25",
    changes: [
      "Introduced user profiles",
      "Enhanced recommendation engine",
      "Updated UI for better user experience",
    ],
  },
  {
    version: "1.0.0",
    date: "2024-05-10",
    changes: [
      "Initial release of Enjoytown",
      "Implemented basic streaming functionality",
      "Added support for movies, TV series, and anime",
    ],
  },
];

 const data = [
   {
     title: "2024",
     content: (
       <div>
         <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
           ✅ Totally revamped the UI to be cooler and fresher than ever. The
           vibe is on point!
         </p>
         <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
           ✅ Added a New Lists Feature to find alternatives for watching movies
           and anime
         </p>
         <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
           ✅ Squashed those pesky minor bugs for an even smoother experience.
           No more annoying little hiccups.
         </p>
       </div>
     ),
   },
   {
     title: "Early 2023",
     content: (
       <div>
         <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
           I usually run out of copy, but when I see content this big, I try to
           integrate lorem ipsum.
         </p>
         <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
           Lorem ipsum is for people who are too lazy to write copy. But we are
           not. Here are some more example of beautiful designs I built.
         </p>
       </div>
     ),
   },
   {
     title: "Changelog",
     content: (
       <div>
         <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
           Deployed 5 new components on Aceternity today
         </p>
         <div className="mb-8">
           <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             ✅ Card grid component
           </div>
           <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             ✅ Startup template Aceternity
           </div>
           <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             ✅ Random file upload lol
           </div>
           <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             ✅ Himesh Reshammiya Music CD
           </div>
           <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             ✅ Salman Bhai Fan Club registrations open
           </div>
         </div>
       </div>
     ),
   },
 ];
export default function Changelog() {
  return (
    <>
      <div className="w-full">
        <Timeline data={data} />
      </div>
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[50vh] items-center">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold">Changelog</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Stay up to date with the latest changes and improvements in
              Enjoytown.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
