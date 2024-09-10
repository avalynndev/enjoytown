import DetailsContainer from "@/components/containers/anime/details";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";

export default async function Info({ params }: any) {
  const id = params.id;
  const anilist = new Anilist(new Gogoanime());
  const res = await anilist.fetchAnilistInfoById(id);

  return <DetailsContainer data={res} />;
}
