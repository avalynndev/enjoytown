import { axiosClient, Credits, Language } from '@/lib/tmdb';

export const credits = async (variant: 'movie' | 'tv', id: number, language: Language) => {
  const { data } = await axiosClient.get<Credits>(`/${variant}/${id}/credits`, {
    params: {
      language,
    },
  });

  return data;
};
