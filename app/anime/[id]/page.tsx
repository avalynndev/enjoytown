import DetailsContainer from '@/components/containers/anime/details';
import Zoro from 'avalynndev-extensions/dist/providers/anime/zoro';
import Anilist from 'avalynndev-extensions/dist/providers/meta/anilist';

export default async function Info({ params }: any) {
  const p = await params;
  const anilist = new Anilist(new Zoro());
  const res = await anilist.fetchAnilistInfoById(p.id);

  return <DetailsContainer data={res} />;
}
