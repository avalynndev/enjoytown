import { axiosClient, GetKeywordsResponse } from '@/lib/tmdb'

export const keywords = async (type: 'tv' | 'movie', id: number) => {
  const { data } = await axiosClient.get<GetKeywordsResponse>(
    `/${type}/${id}/keywords`,
  )

  return data.keywords || data.results
}
