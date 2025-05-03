'use client';
import { useState } from 'react';
import { useSearch } from '@/hooks/use-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const SearchHeader = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'movie' | 'tv' | 'anime'>('movie');
  const [showFilters, setShowFilters] = useState(false);

  const { results, isLoading } = useSearch(query, category);

  return (
    <div className="space-y-6">
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-4">
          {/* Input */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform opacity-50" />
            <Input
              placeholder="What do you want to watch?"
              className="w-full rounded-lg pl-10" // Add padding on the left to accommodate the icon
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <Select
            value={category}
            onValueChange={(val) => {
              setCategory(val as any);
              if (val === 'anime') {
                setShowFilters(false);
              }
            }}
          >
            <SelectTrigger className="min-w-[100px] rounded-lg">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="tv">TV Show</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={'outline'}
            size="icon"
            onClick={() => {
              if (category !== 'anime') {
                setShowFilters((prev) => !prev);
              }
            }}
            className="rounded-lg"
            disabled={category === 'anime'}
          >
            <Filter size={18} />
          </Button>
        </div>
        {showFilters && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Genre */}
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium uppercase">
                Genre
              </label>
              <Select>
                <SelectTrigger className="h-10 w-full rounded-lg">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium uppercase">
                Year
              </label>
              <Select>
                <SelectTrigger className="h-10 w-full rounded-lg">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium uppercase">
                Sort By
              </label>
              <Select>
                <SelectTrigger className="h-10 w-full rounded-lg">
                  <SelectValue placeholder="Most Popular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Country */}
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium uppercase">
                Country
              </label>
              <Select>
                <SelectTrigger className="h-10 w-full rounded-lg">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Optional: Show Results */}
      {isLoading && <p className="text-muted-foreground text-sm">Loading...</p>}
      {results?.length > 0 && (
        <ul className="space-y-2">
          {results.map((item: any) => (
            <Link href={`/${category}/${item.id}`} key={item.id} className="text-sm">
              {category === 'anime'
                ? item.title?.userPreferred ||
                  item.title?.english ||
                  item.title?.romaji ||
                  'Unknown Title'
                : category === 'movie'
                  ? item.title || 'Unknown Title'
                  : item.name || 'Unknown Title'}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHeader;
