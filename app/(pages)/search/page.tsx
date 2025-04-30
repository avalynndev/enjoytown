import { CommandSearch } from '@/components/command-search';

export default function SearchPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <CommandSearch />
      </div>
    </div>
  );
}
