import { Pattern } from '@/components/ui/pattern';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Removed() {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black">
      <Pattern variant="dots" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <h2 className="font-heading text-center text-5xl leading-tight font-extrabold sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            DMCA Takedown Notice
          </span>
          <span className="ml-3">⏳</span>
        </h2>

        <p className="mt-6 max-w-3xl text-center text-lg font-light text-gray-700 md:text-xl lg:text-2xl dark:text-gray-300">
          The content you’re looking for has been{' '}
          <span className="font-semibold text-red-500">removed</span> due to a DMCA takedown
          request. We apologize for the inconvenience.
        </p>

        <p className="mt-4 max-w-2xl text-center text-base text-gray-600 dark:text-gray-400">
          <span className="font-medium">Why was it removed?</span> Under the Digital Millennium
          Copyright Act (DMCA), we are required to remove content upon valid copyright complaints.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/">
            <Button
              variant="default"
              size="lg"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Home
            </Button>
          </Link>
          <Link href="/list/mtv">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800"
            >
              Other sites
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
