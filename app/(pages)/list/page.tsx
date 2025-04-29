import * as Craft from '@/components/ui/craft';
import Link from 'next/link';

type FeatureText = {
  title: string;
  description: string;
  href?: string;
};

const featureText: FeatureText[] = [
  {
    title: 'Movie/TV',
    href: '/list/mtv',
    description: 'Explore Movie And Tv Shows: Spectacles Await You!',
  },
  {
    title: 'Anime',
    href: '/list/anime',
    description: 'Dive into Anime Worlds: Adventures Await!',
  },
  {
    title: 'Drama',
    href: '/drama',
    description: 'Indulge in Drama: Emotions Await!',
  },
];

export default function List() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Introduction Section */}
          <div className="text-center">
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              Introduction
            </h1>
            <p className="text-muted-foreground mt-4 text-xl">
              Discover and enjoy free streaming content across various genres.
            </p>
          </div>
          <Craft.Section className="">
            <Craft.Container className="">
              <div className="flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {featureText.map(({ title, description, href }, index) => (
                    <Link
                      href={`${href}`}
                      className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                      key={index}
                    >
                      <div className="grid gap-4">
                        <h4 className="text-primary text-xl">
                          {title}{' '}
                          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                          </span>
                        </h4>
                        <p className="text-base opacity-75">{description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Craft.Container>
          </Craft.Section>
        </div>
      </div>
    </div>
  );
}
