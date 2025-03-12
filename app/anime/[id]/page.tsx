import DetailsContainer from '@/components/containers/anime/details';
import Gogoanime from 'avalynndev-extensions/dist/providers/anime/gogoanime';
import Anilist from 'avalynndev-extensions/dist/providers/meta/anilist';

export default async function Info({ params }: any) {
  const p = await params;
  const anilist = new Anilist(new Gogoanime());
  const res = await anilist.fetchAnilistInfoById(p.id);

  return <DetailsContainer data={res} />;
}
