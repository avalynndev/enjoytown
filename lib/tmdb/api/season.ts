import { axiosClient } from '..';
import { Language } from '@/lib/tmdb';
import { SeasonDetails } from '@/lib/tmdb';

const details = async (seriesId: number, seasonNumber: number, language: Language) => {
  const { data } = await axiosClient.get<SeasonDetails>(`/tv/${seriesId}/season/${seasonNumber}`, {
    params: {
      language,
    },
  });

  return data;
};

export const season = { details };
