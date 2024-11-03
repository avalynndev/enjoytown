import { axiosClient, GetGenresResponse, Language } from '@/lib/tmdb';

export const genres = async (type: 'movie' | 'tv', language: Language) => {
  const { data } = await axiosClient.get<GetGenresResponse>(`/genre/${type}/list`, {
    params: {
      language,
    },
  });

  return data;
};
