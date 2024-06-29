"use client";
import { Pattern } from "@/components/ui/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import { useRouter } from "next/navigation";
import * as Craft from "@/components/ui/craft";

interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

const changelogEntries: ChangelogEntry[] = [
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

export default function Changelog() {
  const router = useRouter();

  return (
    <>
      <Pattern variant="checkered" />
      <SiteHeader />
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
      <section className="space-y-8">
        <Craft.Section className="">
          <Craft.Container className="">
            <div className="flex flex-col gap-6">
              {changelogEntries.map((entry, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                      Version {entry.version}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {entry.date}
                    </p>
                  </div>
                  <ul className="list-disc pl-6">
                    {entry.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="mb-2">
                        {change} {/* Removed the extra dot */}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Craft.Container>
        </Craft.Section>
      </section>
    </>
  );
}
