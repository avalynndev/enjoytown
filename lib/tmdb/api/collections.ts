import { axiosClient } from '@/lib/tmdb/index';
import { Language } from '@/lib/tmdb/models/language';

const details = async (id: number, language: Language) => {
  const { data } = await axiosClient.get(`/collection/${id}`, {
    params: {
      language,
    },
  });

  return data;
};

export const collections = { details };
