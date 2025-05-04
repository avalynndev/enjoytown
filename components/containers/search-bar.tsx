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
import { Filter, ImageIcon } from 'lucide-react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

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
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
          {results.map((item: any) => (
            <Link
              href={`/${category}/${item.id}`}
              key={item.id}
              className="w-full cursor-pointer space-y-2"
              data-testid="movie-card"
            >
              <div className="bg-background/50 relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border shadow-sm">
                {item.backdrop_path || item.image ? (
                  <Image
                    fill
                    className="object-cover"
                    src={
                      category === 'anime'
                        ? item.image
                        : `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                    }
                    alt={
                      category === 'anime'
                        ? typeof item.title === 'string'
                          ? item.title
                          : item.title.english ||
                            item.title.userPreferred ||
                            item.title.romaji ||
                            item.title.native ||
                            'Unknown Title'
                        : category === 'movie'
                          ? item.title || 'Unknown Title'
                          : item.name || 'Unknown Title'
                    }
                    sizes="100%"
                  />
                ) : (
                  <ImageIcon className="text-muted" />
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-1">
                  {category === 'anime' ? (
                    <>
                      <div className="justify-start">
                        <span className="trucate line-clamp-1">
                          {typeof item.title === 'string'
                            ? item.title
                            : item.title.english ||
                              item.title.userPreferred ||
                              item.title.romaji ||
                              item.title.native ||
                              ''}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        {item.rating && (
                          <Badge variant="outline">{item.rating ? item.rating / 10 : '?'}</Badge>
                        )}
                        <Badge variant="default">
                          {item.episodeNumber ? item.episodeNumber : (item.totalEpisodes ?? '?')}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="">
                        {category === 'movie'
                          ? item.title || 'Unknown Title'
                          : item.name || 'Unknown Title'}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline">
                              {item.vote_average ? item.vote_average.toFixed(1) : '?'}
                            </Badge>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>{item.vote_count} votes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>{' '}
                    </>
                  )}
                </div>

                <p className="text-muted-foreground line-clamp-3 text-xs">
                  {category === 'anime' ? item.description : item.overview}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
