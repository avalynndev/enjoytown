import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <div className="relative flex h-screen flex-col place-items-center justify-center">
        <h1 className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 bg-clip-text text-[80px] leading-none font-extrabold tracking-tight text-transparent sm:text-[100px] lg:text-[120px]">
          404
        </h1>
        <span className="mt-2 mb-6 text-3xl sm:text-4xl">⏳</span>
        <p className="m-5 max-w-3xl px-6 text-center text-2xl font-thin text-slate-800 md:text-3xl dark:text-slate-100">
          Did you take a wrong turn?
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
