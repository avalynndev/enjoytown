import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const EpisodeContainer = ({ data, id }: any) => {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          {data &&
            data.map((episodes: any) => (
              <Link
                shallow
                key={`episode-${id}-${episodes.id}`}
                href={`/drama/watch/${id}/${episodes.id}`}
              >
                <Button key={data.id}>{episodes.episode}</Button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodeContainer;
