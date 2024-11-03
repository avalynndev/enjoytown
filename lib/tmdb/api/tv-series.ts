import { Language } from '@/lib/tmdb';
import { axiosClient } from '../index';
import { TvSerie, TvSerieDetails } from '@/lib/tmdb';
import { ListResponse } from '@/lib/tmdb/utils/list-response';

/*
|-----------------------------------------------------------------------------
| Details
| 
| References:
| https://developer.themoviedb.org/reference/tv-series-details
| 
|-----------------------------------------------------------------------------
*/

const details = async (id: number, language: Language) => {
  const { data } = await axiosClient.get<TvSerieDetails>(`/tv/${id}`, {
    params: {
      language,
    },
  });

  return data;
};

/*
|-----------------------------------------------------------------------------
| Discover
| 
| References:
| https://developer.themoviedb.org/reference/discover-tv
| 
|-----------------------------------------------------------------------------
*/

type DiscoverTvSeriesFilters = Partial<
  Record<
    | 'air_date.gte'
    | 'air_date.lte'
    | 'sort_by'
    | 'with_genres'
    | 'with_original_language'
    | 'with_keywords'
    | 'with_watch_providers'
    | 'watch_region'
    | 'vote_average.gte'
    | 'vote_average.lte'
    | 'vote_count.gte',
    string | null
  >
>;

type DiscoverTvSeriesOptions = {
  language: Language;
  page: number;
  filters?: DiscoverTvSeriesFilters;
};

export const discover = async (options: DiscoverTvSeriesOptions) => {
  const { page, language, filters } = options;

  const { data } = await axiosClient.get<ListResponse<TvSerie>>(`/discover/tv`, {
    params: {
      page,
      language,
      ...filters,
    },
  });

  return data;
};

/*
|-----------------------------------------------------------------------------
| List
| 
| References:
| https://developer.themoviedb.org/reference/tv-series-airing-today-list
| https://developer.themoviedb.org/reference/tv-series-on-the-air-list
| https://developer.themoviedb.org/reference/tv-series-popular-list
| https://developer.themoviedb.org/reference/tv-series-top-rated-list
| 
|-----------------------------------------------------------------------------
*/

type TvSeriesListType = 'airing_today' | 'on_the_air' | 'popular' | 'top_rated';

type ListQueryParams = {
  list: TvSeriesListType;
  language: Language;
  page: number;
};

const list = async (params: ListQueryParams) => {
  const { list, language, page } = params;

  const { data } = await axiosClient.get<ListResponse<TvSerie>>(`/tv/${list}`, {
    params: {
      language,
      page,
    },
  });

  return data;
};

const trending = async (timeWindow: 'day' | 'week', language: Language) => {
  const { data } = await axiosClient.get<ListResponse<TvSerie>>(`/trending/tv/${timeWindow}`, {
    params: {
      language,
    },
  });

  return data;
};

const search = async (query: string, language: Language) => {
  const { data } = await axiosClient.get<ListResponse<TvSerie>>(`/search/tv`, {
    params: {
      query,
      language,
    },
  });

  return data;
};

const popular = async (language: Language) => {
  const { data } = await axiosClient.get<ListResponse<TvSerie>>(`/tv/popular`, {
    params: {
      language,
    },
  });

  return data;
};

/*
|-----------------------------------------------------------------------------
| Related
| 
| References:
| https://developer.themoviedb.org/reference/tv-series-recommendations
| https://developer.themoviedb.org/reference/tv-series-similar
| 
|-----------------------------------------------------------------------------
*/
export type TVRelatedType = 'recommendations' | 'similar';

const related = async (id: number, type: TVRelatedType, language: Language) => {
  const { data } = await axiosClient.get<ListResponse<TvSerie>>(
    `/tv/${id}/${type}`,

    {
      params: {
        language,
      },
    },
  );

  return data;
};

export const tv = { details, discover, list, related, trending, search, popular };
export { type TvSeriesListType, type DiscoverTvSeriesFilters };
