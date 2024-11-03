const STORAGE_KEY = 'recentSearches';

export const saveSearchToLocalStorage = (searchTerm: string): void => {
  const existingSearches: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const updatedSearches: string[] = [...new Set([searchTerm, ...existingSearches])];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
};

export const getRecentSearchesFromLocalStorage = (): string[] => {
  const searches: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return searches.sort();
};
