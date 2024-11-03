import axios from 'axios';
import {
  collections,
  credits,
  genres,
  images,
  keywords,
  languages,
  movies,
  search,
  season,
  tv,
  videos,
  watchProviders,
  person,
} from '@/lib/tmdb/api';

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const axiosClient =
  typeof window === 'undefined'
    ? // Server side
      axios.create({
        baseURL: 'https://api.themoviedb.org/3',
        params: {
          api_key: TMDB_API_KEY,
        },
      })
    : // Client side
      axios.create({
        baseURL: '/api/tmdb',
      });

export const tmdb = {
  collections,
  credits,
  genres,
  images,
  keywords,
  languages,
  movies,
  search,
  season,
  tv,
  videos,
  watchProviders,
  person,
};

export * from '@/lib/tmdb/models';
export * from '@/lib/tmdb/api';
