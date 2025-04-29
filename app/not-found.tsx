import { Pattern } from '@/components/ui/pattern';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <Pattern variant="dots" />
      <div className="relative flex min-h-screen flex-col place-items-center justify-center">
        <h2 className="font-heading m-10 text-center text-6xl leading-[5rem] font-black sm:text-7xl sm:leading-[7rem] lg:text-8xl lg:leading-[7rem]">
          <span className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            404
          </span>
          <span className="">⏳</span>
        </h2>
        <p className="m-5 max-w-3xl px-6 text-center text-2xl font-thin text-slate-800 md:text-3xl dark:text-slate-100">
          Did you take a wrong turn?
        </p>
        <Link href="/">
          <Button asChild>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
