import { axiosClient } from '..'
import { GetLanguagesResponse } from '@/lib/tmdb'

export const languages = async () => {
  const { data } = await axiosClient.get<GetLanguagesResponse>(
    '/configuration/languages',
  )

  return data
}
