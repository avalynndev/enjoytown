// import { env } from "@/env.mjs";
import { env } from 'process';

export async function FetchAnimeInfo(data: any) {
  try {
    const fetchPromises = data.results.map(async (element: any) => {
      const link = `${env.CONSUMET_API_URL}/movies/dramacool/info?id=${element.id}`;
      await fetch(link, { next: { revalidate: 21600 } });
    });

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error('Error occurred while pre-fetching video links:', error);
  }
}

export async function fetchDramaSearch(title: any) {
  const res = await fetch(`https://apiconsumetorg-1.vercel.app/movies/dramacool/${title}`, {
    cache: 'force-cache',
  });
  const data = await res.json();
  return data;
}

export async function getVideoLink(epiId: any, mediaId: any) {
  let videoLink;
  const res = await fetch(
    `${env.CONSUMET_API_URL}/movies/dramacool/watch?episodeId=${epiId}&mediaId=drama-detail/${mediaId}`,
    { cache: 'force-cache' },
  );
  const data = await res.json();
  videoLink = data.sources[0].url;
  return videoLink;
}
