// hooks/useSearch.ts
import { useState, useEffect } from 'react';
import { tmdb } from '@/lib/tmdb';
import { fetchAnimeSearch } from '@/lib/consumet';

type SearchCategory = 'movie' | 'tv' | 'anime';

export function useSearch(search: string, category: SearchCategory) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (!search.trim()) {
      setResults(null);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true);

      if (category === 'movie') {
        const movieData = await tmdb.movies.search(search, 'en-US');
        setResults(movieData.results);
      } else if (category === 'tv') {
        const tvData = await tmdb.tv.search(search, 'en-US');
        setResults(tvData.results);
      } else if (category === 'anime') {
        const animeData = await fetchAnimeSearch(search);
        setResults(animeData.results);
      }

      setIsLoading(false);
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [search, category]);

  return { results, isLoading };
}
