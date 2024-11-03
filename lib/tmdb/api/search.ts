import { axiosClient } from '..';

import {
  Language,
  MovieWithMediaType,
  TvSerieWithMediaType,
  PersonWithMediaType,
} from '@/lib/tmdb';
import { ListResponse } from '@/lib/tmdb/utils/list-response';

const multi = async (query: string, language: Language) => {
  const { data } = await axiosClient.get<
    ListResponse<MovieWithMediaType | TvSerieWithMediaType | PersonWithMediaType>
  >('/search/multi', {
    params: {
      query,
      language,
    },
  });

  return data;
};

export const search = { multi };
