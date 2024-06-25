import { getInfoURL } from "@/config/url";
import DetailsContainer from "@/components/movie/containers/details";

export default async function Info({ params }: any) {
  const id = params.id;
  const data = await get_movie_info(id);

  return <DetailsContainer data={data} id={id} embed="false" />;
}

const get_movie_info = async (id: any) => {
  const res = await fetch(getInfoURL(id), { next: { revalidate: 21620 } });
  const data = await res.json();
  return data;
};
