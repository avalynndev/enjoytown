"use server";
import { API_KEY } from "@/config/url";
import { env } from "@/env.mjs";
import { getInfoURL } from "@/config/url";

export async function fetchCarousalData(type: string) {
  try {
    const url = new URL(
      `https://sup-proxy.zephex0-f6c.workers.dev/api-json?url=https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchManga(id: any) {
  const res = await fetch(
     `https://api.mangadex.dev/at-home/server/${id}`,
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
}

export async function PreFetchChaterLinks(data: any) {
  try {
    const fetchPromises = data.map(async (element: any) => {
      const link = `${env.CONSUMET_API_URL}/meta/anilist-manga/read?chapterId=${element.id}&provider=mangadex`;
      await fetch(link, { cache: "force-cache" });
    });

    await Promise.all(fetchPromises);
    console.log("Chapter links pre-fetched successfully!");
  } catch (error) {
    console.error("Error occurred while pre-fetching chapter links:", error);
  }
}

export async function PreFetchMangaInfo(data: any) {
  try {
    const fetchPromises = data.results.map(async (element: any) => {
      const link = `${env.CONSUMET_API_URL}/meta/anilist-manga/${element.id}?provider=mangadex`;
      await fetch(link, { next: { revalidate: 86400 } });
    });
    await Promise.all(fetchPromises);
    console.log("Manga info pre-fetched successfully!");
  } catch (error) {
    console.error("error", error);
  }
}

export const FetchMovieInfo = async (data: any) => {
  try {
    const fetchPromises = data.results.map(async (element: any) => {
      const link = `${getInfoURL(element.id)}`;
      await fetch(link, { next: { revalidate: 21600 } });
    });

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error("Error occurred while pre-fetching video links:", error);
  }
};
export async function getDramaDownload(episode: any) {
  const res = await fetch(`${env.DOWNLOAD_API_URL}/episode/${episode}`, {
    next: { revalidate: 21600 },
  });
  const data = await res.json();
  return data;
}

export async function getDramaInfo(id: any) {
  const res = await fetch(
    `${env.CONSUMET_API_URL}/movies/dramacool/info?id=${id}`,
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
}

export async function getDramaInfoOnWatch(id: any) {
  const res = await fetch(
    `${env.CONSUMET_API_URL}/movies/dramacool/info?id=%2Fdrama-detail%2F${id}`,
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
}

export async function FetchVideoLinks(data: any, dramaId: any) {
  try {
    const fetchPromises = data.map(async (element: any) => {
      const link = `${env.CONSUMET_API_URL}/movies/dramacool/watch?episodeId=${element.id}&mediaId=${dramaId}`;
      await fetch(link, { cache: "force-cache" });
    });

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error("Error occurred while pre-fetching video links:", error);
  }
}

export async function FetchAnimeInfo(data: any) {
  try {
    const fetchPromises = data.results.map(async (element: any) => {
      const link = `${env.CONSUMET_API_URL}/movies/dramacool/info?id=${element.id}`;
      await fetch(link, { next: { revalidate: 21600 } });
    });

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error("Error occurred while pre-fetching video links:", error);
  }
}

export async function FetchSearchTitle(title: any) {
  const res = await fetch(`${env.CONSUMET_API_URL}/movies/dramacool/${title}`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data;
}

export async function getVideoLink(epiId: any, mediaId: any) {
  let videoLink;
  const res = await fetch(
    `${env.CONSUMET_API_URL}/movies/dramacool/watch?episodeId=${epiId}&mediaId=drama-detail/${mediaId}`,
    { cache: "force-cache" }
  );
  const data = await res.json();
  videoLink = data.sources[0].url;
  return videoLink;
}
