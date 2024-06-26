import { getTVInfoURL } from "@/config/url";
import DetailsContainer from "@/components/tv/containers/details";

export default async function Info({ params }: any) {
  const id = params.id;
  const data = await get_tv_info(id);

  return <DetailsContainer data={data} id={id}/>;
}

const get_tv_info = async (id: any) => {
  const res = await fetch(getTVInfoURL(id), { next: { revalidate: 21620 } });
  const data = await res.json();
  return data;
};
