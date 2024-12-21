import { axiosClient, Language, Movie, MovieDetails } from '@/lib/tmdb';
import { ListResponse } from '@/lib/tmdb/utils/list-response';

/*
|-----------------------------------------------------------------------------
| Details
|
| References:
| https://developer.themoviedb.org/reference/movie-details
|-----------------------------------------------------------------------------
*/

const details = async (id: number, language: Language) => {
  try {
    const { data } = await axiosClient.get<MovieDetails>(`/movie/${id}`, {
      params: { language },
    });
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Host not permitted');
  }
};

/*
|-----------------------------------------------------------------------------
| Discover movie
|
| References:
| https://developer.themoviedb.org/reference/discover-movie
|-----------------------------------------------------------------------------
*/

type DiscoverMovieFilters = Partial<
  Record<
    | 'with_genres'
    | 'release_date.gte'
    | 'release_date.lte'
    | 'with_original_language'
    | 'sort_by'
    | 'with_watch_providers'
    | 'with_keywords'
    | 'watch_region'
    | 'vote_average.gte'
    | 'vote_average.lte'
    | 'vote_count.gte',
    string | null
  >
>;

type DiscoverOptions = {
  language: Language;
  page: number;
  filters: DiscoverMovieFilters;
};

const discover = async (options: DiscoverOptions) => {
  const { page, language, filters } = options;
  try {
    const { data } = await axiosClient.get<ListResponse<Movie>>(`/discover/movie`, {
      params: { page, language, ...filters },
    });
    return data;
  } catch (error) {
    console.error('Error discovering movies:', error);
    throw new Error('Host not permitted');
  }
};

const trending = async (timeWindow: 'day' | 'week', language: Language) => {
  try {
    const { data } = await axiosClient.get<ListResponse<Movie>>(`/trending/movie/${timeWindow}`, {
      params: { language },
    });
    return data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw new Error('Host not permitted');
  }
};

const search = async (query: string, language: Language) => {
  try {
    const { data } = await axiosClient.get<ListResponse<Movie>>(`/search/movie`, {
      params: { query, language },
    });
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Host not permitted');
  }
};

const popular = async (language: Language) => {
  try {
    const { data } = await axiosClient.get<ListResponse<Movie>>(`/movie/popular`, {
      params: { language },
    });
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw new Error('Host not permitted');
  }
};

/*
|-----------------------------------------------------------------------------
| Movie lists
|
| References:
| 1. https://developer.themoviedb.org/reference/movie-now-playing-list
| 2. https://developer.themoviedb.org/reference/movie-popular-list
| 3. https://developer.themoviedb.org/reference/movie-top-rated-list
| 4. https://developer.themoviedb.org/reference/movie-upcoming-list
|-----------------------------------------------------------------------------
*/

type MovieListType = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';
type ListOptions = {
  list: MovieListType;
  language: Language;
  page: number;
};

const list = async (options: ListOptions) => {
  const { list, page = 1, language } = options;
  try {
    const { data } = await axiosClient.get<ListResponse<Movie>>(`/movie/${list}`, {
      params: { language, page },
    });
    return data;
  } catch (error) {
    console.error('Error fetching movie list:', error);
    throw new Error('Host not permitted');
  }
};

/*
|-----------------------------------------------------------------------------
| Movie related (similar & recommendations)
|
| References:
| 1. https://developer.themoviedb.org/reference/movie-recommendations
| 2. https://developer.themoviedb.org/reference/movie-similar
|-----------------------------------------------------------------------------
*/

type MovieRelatedType = 'recommendations' | 'similar';
type RelatedResponse = ListResponse<Movie>;

const related = async (id: number, type: MovieRelatedType, language: Language) => {
  try {
    const { data } = await axiosClient.get<RelatedResponse>(`/movie/${id}/${type}`, {
      params: { language },
    });
    return data;
  } catch (error) {
    console.error('Error fetching related movies:', error);
    throw new Error('Host not permitted');
  }
};

export const movies = { details, discover, related, list, trending, search, popular };
export { type DiscoverMovieFilters, type MovieListType, type MovieRelatedType };
