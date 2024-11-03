import { axiosClient, GetImagesResponse } from '@/lib/tmdb'

export const images = async (
  variant: 'movie' | 'tv' | 'person',
  id: number,
) => {
  const { data } = await axiosClient.get<GetImagesResponse>(
    `/${variant}/${id}/images`,
  )

  return data
}
