'use server';
export async function FetchAnimeInfo(data: any) {
  try {
    const fetchPromises = data.results.map(async (element: any) => {
      const link = `${process.env.CONSUMET_API_URL}/movies/dramacool/info?id=${element.id}`;
      await fetch(link, { next: { revalidate: 21600 } });
    });

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error('Error occurred while pre-fetching video links:', error);
  }
}

export async function fetchDramaSearch(title: any) {
  const res = await fetch(`${process.env.CONSUMET_API_URL}/movies/dramacool/${title}`, {
    cache: 'force-cache',
  });
  const data = await res.json();
  return data;
}

export async function getVideoLink(epiId: any, mediaId: any) {
  let videoLink;
  const res = await fetch(
    `${process.env.CONSUMET_API_URL}/movies/dramacool/watch?episodeId=${epiId}&mediaId=drama-detail/${mediaId}`,
    { cache: 'force-cache' },
  );
  const data = await res.json();
  videoLink = data.sources[0].url;
  return videoLink;
}

export async function PreFetchMangaInfo(data: any) {
  try {
    const fetchPromises = data.results.map(async (element: any) => {
      const link = `${process.env.CONSUMET_API_URL}/meta/anilist-manga/${element.id}?provider=mangareader`;
      await fetch(link, { next: { revalidate: 86400 } });
    });
    await Promise.all(fetchPromises);
  } catch (error) {
    console.error('error', error);
  }
}

export async function PreFetchChaterLinks(data: any) {
  try {
    const fetchPromises = data.map(async (element: any) => {
      const link = `${process.env.CONSUMET_API_URL}/meta/anilist-manga/read?chapterId=${element.id}&provider=mangadex`;
      await fetch(link, { cache: 'force-cache' });
    });

    await Promise.all(fetchPromises);
    console.log('Chapter links pre-fetched successfully!');
  } catch (error) {
    console.error('Error occurred while pre-fetching chapter links:', error);
  }
}

export async function GetSearchedAnime(title: any) {
  const res = await fetch(
    `${process.env.CONSUMET_API_URL}/meta/anilist-manga/` + title + '?provider=mangareader',
  );
  const data = await res.json();
  return data;
}

export async function getMangaInfo(id: any) {
  const res = await fetch(
    `${process.env.CONSUMET_API_URL}/meta/anilist-manga/info/${id}?provider=mangareader`,
    { next: { revalidate: 21600 } },
  );
  const data = await res.json();
  return data;
}

export async function fetchChapter(id: any) {
  const res = await fetch(
    `${process.env.CONSUMET_API_URL}/meta/anilist-manga/read?chapterId=${id}&provider=mangareader`,
    { next: { revalidate: 21600 } },
  );
  const data = await res.json();
  return data;
}
