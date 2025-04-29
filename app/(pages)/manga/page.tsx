import SearchBar from '@/components/manga-search';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="p-4">
        <div className="mx-auto my-8 h-[40vh] max-w-7xl overflow-hidden rounded-lg border md:rounded-xl">
          <Image
            className="not-prose h-full w-full object-cover object-bottom"
            src="/manga.png"
            width={920}
            height={80}
            alt="hero image"
          />
        </div>

        <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-6xl font-bold">Explore Mangas!</h1>
          <div className="flex gap-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}
