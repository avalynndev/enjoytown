import DetailsContainer from "@/components/containers/anime/details";

export default async function Info({ params }: any) {
  const id = params.id;
  const data = await get_movie_info(id);

  return <DetailsContainer data={data} />;
}

const get_movie_info = async (id: any) => {
  const res = await fetch(
    `https://consumet-jade.vercel.app/meta/anilist/info/${id}`,
    { next: { revalidate: 21620 } }
  );
  const data = await res.json();
  return data;
};
