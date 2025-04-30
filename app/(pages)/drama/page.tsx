import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative h-[82vh] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 bg-clip-text text-[80px] leading-none font-extrabold tracking-tight text-transparent sm:text-[100px] lg:text-[120px]">
          404
        </h1>
        <span className="mt-2 mb-6 text-3xl sm:text-4xl">⏳</span>
        <p className="text-muted-foreground mb-4 max-w-xl text-center text-sm sm:text-base">
          The drama section has been removed. Our previous provider, <strong>Dramacool</strong>, is
          no longer available, and no suitable alternative has been found yet.
        </p>
        <p className="text-muted-foreground mb-8 max-w-md text-center text-xs">
          You can explore other alternative sources listed on the{' '}
          <Link
            href="/list"
            className="underline underline-offset-2 transition-colors hover:text-pink-500"
          >
            /list
          </Link>{' '}
          page.
        </p>

        <Button
          size="lg"
          asChild
          className="rounded-2xl px-8 py-5 text-base shadow-md transition-all hover:shadow-lg"
        >
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
