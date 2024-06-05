"use client";
import Link from "next/link";

export default function Buttons({ data }: any) {
  let hasValidLinks = false;

  return (
    <div>
      {data.chapters &&
        data.chapters.map((item: any, index: any) => {
          if (item.pages !== 0) {
            hasValidLinks = true;
            return (
              <Link
                key={index}
                href={{
                  pathname: `/manga/info/read/${item.id}`,
                }}
              >
                <button key={index}>
                  <div>
                    <p>Chapter: {item.chapterNumber}</p>
                    <p>Volume: {item.volumeNumber}</p>
                  </div>
                </button>
              </Link>
            );
          }
        })}
      {!hasValidLinks && <p>Links not found</p>}
    </div>
  );
}
