"use server";

export async function getDramaInfo(id: any) {
  const res = await fetch(
    `https://consumet-jade.vercel.app/movies/dramacool/info?id=${id}`,
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
}

export async function getDramaInfoOnWatch(id: any) {
  const res = await fetch(
    `https://consumet-jade.vercel.app/movies/dramacool/info?id=%2Fdrama-detail%2F${id}`,
    { next: { revalidate: 21600 } }
  );
  const data = await res.json();
  return data;
}

export async function FetchVideoLinks(data: any, dramaId: any) {
  try {
    const fetchPromises = data.map(async (element: any) => {
      const link = `https://consumet-jade.vercel.app/movies/dramacool/watch?episodeId=${element.id}&mediaId=${dramaId}`;
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
      const link = `https://consumet-jade.vercel.app/movies/dramacool/info?id=${element.id}`;
      await fetch(link, { next: { revalidate: 21600 } });
    });

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error("Error occurred while pre-fetching video links:", error);
  }
}

export async function FetchSearchTitle(title: any) {
  const res = await fetch(
    `https://consumet-jade.vercel.app/movies/dramacool/${title}`,
    { cache: "force-cache" }
  );
  const data = await res.json();
  return data;
}

export async function getVideoLink(epiId: any, mediaId: any) {
  let videoLink;
  const res = await fetch(
    `https://consumet-jade.vercel.app/movies/dramacool/watch?episodeId=${epiId}&mediaId=drama-detail/${mediaId}`,
    { cache: "force-cache" }
  );
  const data = await res.json();
  videoLink = data.sources[0].url;
  return videoLink;
}
