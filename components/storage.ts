const STORAGE_KEY = 'recentSearches';

type RecentSearch = {
  term: string;
  category: 'movie' | 'tv' | 'anime' | 'recent';
};

export const saveSearchToLocalStorage = (
  searchTerm: string,
  category: RecentSearch['category'],
): void => {
  const existingSearches: RecentSearch[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const updatedSearches: RecentSearch[] = [
    { term: searchTerm, category },
    ...existingSearches.filter((item) => item.term !== searchTerm || item.category !== category),
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
};

export const getRecentSearchesFromLocalStorage = (): RecentSearch[] => {
  const searches: RecentSearch[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return searches;
};
