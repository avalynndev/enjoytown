import axios, { AxiosError } from 'axios';
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

const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    const { data, status, config } = error.response;
    console.error('Error fetching data:', {
      message: (data as { message?: string }).message || 'No message available',
      status,
      config,
    });
  } else {
    console.error('Error:', error.message);
  }
};

// Merged client side and server side fetch
export const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    handleAxiosError(error);
    return Promise.reject(error);
  },
);

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
