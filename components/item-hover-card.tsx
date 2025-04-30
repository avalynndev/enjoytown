import type { PropsWithChildren } from 'react';

const Banner = (props: PropsWithChildren) => {
  return (
    <figure
      className="bg-muted dark:bg-muted/25 relative aspect-[16/6] overflow-hidden"
      {...props}
    />
  );
};

const Information = (props: PropsWithChildren) => {
  return <div className="flex gap-2 p-4" {...props} />;
};

const Poster = (props: PropsWithChildren) => {
  return (
    <div className="w-1/3">
      <figure
        className="bg-muted relative -mt-12 aspect-[2/3] overflow-hidden rounded-lg border shadow"
        {...props}
      />
    </div>
  );
};

const Summary = (props: PropsWithChildren) => {
  return <div className="w-2/3 space-y-1" {...props} />;
};

const Title = (props: PropsWithChildren) => {
  return <span className="text-sm font-bold" {...props} />;
};

const Overview = (props: PropsWithChildren) => {
  return <span className="text-muted-foreground line-clamp-3 text-xs" {...props} />;
};

export const ItemHoverCard = {
  Banner,
  Information,
  Poster,
  Summary,
  Title,
  Overview,
};
